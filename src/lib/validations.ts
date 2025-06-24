import { z } from "zod";

// Example validation schemas
export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }).max(1000),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email address is too long" })
    .toLowerCase()
    .trim(),
});

export const userProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z.string().max(500).optional(),
});

// Type inference
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;
