import { z } from "zod";

export const SERVICE_CATEGORIES = [
  "Websites & High-Speed Portals",
  "AI Receptionists & Custom Voice Agents",
  "Growth, Regional SEO & Performance Ads",
  "Data Pipelines & CRM Integrations",
  "Accessibility & Core Web Vitals Tuning",
  "Full Digital Operations Retainer",
] as const;

export const BUDGET_RANGES = [
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000+",
] as const;

export const PREFERRED_CONTACT_METHODS = [
  "whatsapp",
  "phone",
  "email",
] as const;

/**
 * Indian phone regex: optional +91, 91, or 0 prefix (with optional space/dash),
 * followed by 10 digits starting with 6, 7, 8, or 9.
 */
export const INDIAN_PHONE_REGEX =
  /^(?:(?:\+91|91|0)[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$|^(?:(?:\+91|91|0)[\s-]?)?[6-9]\d{9}$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  business_name: z
    .string()
    .trim()
    .max(120, "Business name cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is required")
    .regex(
      INDIAN_PHONE_REGEX,
      "Please enter a valid 10-digit Indian phone number (starting 6-9, optional +91)"
    ),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  city: z
    .string()
    .trim()
    .max(80, "City cannot exceed 80 characters")
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_CATEGORIES, {
    message: "Please select a valid service category",
  }),
  budget_range: z.enum(BUDGET_RANGES, {
    message: "Please select an indicative budget range",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Project message must be at least 10 characters")
    .max(1000, "Project message cannot exceed 1000 characters"),
  preferred_contact: z.enum(PREFERRED_CONTACT_METHODS, {
    message: "Please select a valid preferred contact method",
  }).default("whatsapp"),

  // Anti-Spam Security Fields
  honeypot: z.string().optional().or(z.literal("")),
  form_loaded_at: z.number().optional(),
  turnstile_token: z.string().optional().or(z.literal("")),
  source: z.string().optional().default("contact_page"),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
