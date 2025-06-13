
'use server';
import { z } from 'zod';
import { google } from 'googleapis';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export interface ContactFormState {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    server?: string[];
  };
  success: boolean;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to send message. Please check the fields.",
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  console.log("Attempting to use GOOGLE_SHEETS_API_KEY:", process.env.GOOGLE_SHEETS_API_KEY ? "Key is set" : "Key is NOT SET or empty");

  if (!process.env.GOOGLE_SHEETS_API_KEY) {
    console.error("GOOGLE_SHEETS_API_KEY is not set in the environment variables.");
    return {
      message: "Server configuration error: API key for Google Sheets is missing.",
      errors: { server: ["Google Sheets API key is not configured on the server."] },
      success: false,
    };
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });

    const spreadsheetId = '1ORtBI77_8eujwQCrV7CgEH-wAwysUDfXuwAR-Jwl0b8';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D', // Ensure 'Sheet1' is the correct name of your sheet
      valueInputOption: 'USER_ENTERED',
      // The 'auth' property is not directly used here if the sheets instance is already authed.
      // The API key is passed when creating the `sheets` client.
      resource: {
        values: [[name, email, message, new Date().toISOString()]], // Added timestamp
      },
    });

    console.log("Data sent to Google Sheet successfully");
    return {
      message: "Your message has been sent successfully! We'll get back to you soon.",
      errors: {},
      success: true,
    };

  } catch (error: any) {
    console.error("Error sending data to Google Sheet (full error object):", JSON.stringify(error, null, 2));
    
    let specificErrorMessage = "Failed to send message to Google Sheet. Please check server logs for details.";

    if (error.response && error.response.data && error.response.data.error) {
      if (typeof error.response.data.error === 'string') {
          specificErrorMessage = error.response.data.error;
      } else if (error.response.data.error.message) {
          specificErrorMessage = `API Error: ${error.response.data.error.message} (Status: ${error.response.data.error.code})`;
          if (error.response.data.error.details) {
            specificErrorMessage += ` Details: ${JSON.stringify(error.response.data.error.details)}`;
          }
      }
    } else if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      specificErrorMessage = error.errors.map((e: any) => e.message || JSON.stringify(e)).join('; ');
    } else if (error.message) {
      specificErrorMessage = error.message;
    }
  
    return {
      message: `Server error: ${specificErrorMessage}`,
      errors: { server: [specificErrorMessage] },
      success: false,
    };
  }
}
