'use server';
import { z } from 'zod';

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

  // In a real app, you'd send an email here using a service like SendGrid, Resend, etc.
  // For this example, we'll just log it and simulate success.
  console.log("Contact Form Submission Received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential server error (uncomment to test error handling)
  // if (Math.random() > 0.5) {
  //   return {
  //     message: "An unexpected error occurred on the server. Please try again later.",
  //     errors: { server: ["Server simulation error"] },
  //     success: false,
  //   };
  // }

  return {
    message: "Your message has been sent successfully! We'll get back to you soon.",
    errors: {},
    success: true,
  };
}
