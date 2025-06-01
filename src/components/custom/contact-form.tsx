"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialState: ContactFormState = {
  message: "",
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full transition-transform hover:scale-105">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        // Optionally reset form fields here if needed, by managing form state with useState
        // or using form.reset() if using react-hook-form with a client component
      } else if (state.errors && Object.keys(state.errors).length > 0) {
         const errorMessages = Object.values(state.errors).flat().join("\n");
         toast({
          title: "Error",
          description: state.message || errorMessages || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="name" className="font-medium">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="mt-1"
          aria-describedby="name-error"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-destructive mt-1">
            {state.errors.name.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email" className="font-medium">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          className="mt-1"
          aria-describedby="email-error"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-destructive mt-1">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="message" className="font-medium">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message..."
          required
          rows={5}
          className="mt-1"
          aria-describedby="message-error"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-destructive mt-1">
            {state.errors.message.join(", ")}
          </p>
        )}
      </div>
      {state.errors?.server && (
        <p className="text-sm text-destructive text-center">
          {state.errors.server.join(", ")}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
