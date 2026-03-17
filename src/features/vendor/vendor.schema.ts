import z from "zod";

export const vendorUpdateDetailsSchema = z.object({
  shopName: z
    .string()
    .min(3, "Shop name must be at least 3 characters")
    .max(50, "Shop name must not exceed 50 characters")
    .trim(),

  shopAddress: z
    .string()
    .min(10, "Please enter a complete business address")
    .max(200, "Address is too long")
    .trim(),

  gstNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Please enter a valid 15-digit GST number (e.g., 22AAAAA0000A1Z5)",
    ),
});

export type vendorUpdateDetailsData = z.infer<typeof vendorUpdateDetailsSchema>;
