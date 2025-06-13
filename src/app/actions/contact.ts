
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

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    console.error("Google Service Account credentials (client email or private key) are not set in the environment variables.");
    return {
      message: "Server configuration error: Service Account credentials for Google Sheets are missing or incomplete.",
      errors: { server: ["Google Sheets Service Account credentials are not configured correctly on the server."] },
      success: false,
    };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Required scope for Sheets API
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1ORtBI77_8eujwQCrV7CgEH-wAwysUDfXuwAR-Jwl0b8';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D', // Ensure 'Sheet1' is the correct name of your sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: { // Changed 'resource' to 'requestBody' for v4
        values: [[name, email, message, new Date().toISOString()]],
      },
    });

    console.log("Data sent to Google Sheet successfully using Service Account");
    return {
      message: "Your message has been sent successfully! We'll get back to you soon.",
      errors: {},
      success: true,
    };

  } catch (error: any) {
    console.error("Error sending data to Google Sheet with Service Account (full error object):", JSON.stringify(error, null, 2));
    
    let specificErrorMessage = "Failed to send message to Google Sheet. Please check server logs for details.";

    if (error.response && error.response.data && error.response.data.error) {
      if (typeof error.response.data.error === 'string') {
          specificErrorMessage = error.response.data.error;
      } else if (error.response.data.error.message) {
          specificErrorMessage = `API Error: ${error.response.data.error.message} (Status: ${error.response.data.error.code || 'N/A'})`;
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
