import { z } from "zod";

export const RegisterUserSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["user", "vendor", "admin"], {
    message: "Please select an account type.",
  }),
});

// z.infer automatically creates a TypeScript type from your Zod schema.
export type RegisterUserData = z.infer<typeof RegisterUserSchema>;

// Optional: Create a schema with password confirmation - in server we don't need confPass.
export const registerUserWithConfirmSchema = RegisterUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterUserWithConfirmData = z.infer<
  typeof registerUserWithConfirmSchema
>;

export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const updatePhoneAndRoleSchema = z.object({
  phone: z
    .string("Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .max(10, "Phone number must not exceed 10 digits"),
  role: z.enum(["admin", "vendor", "user"], {
    message: "Please select a valid role.",
  }),
});

export type UpdatePhoneAndRoleData = z.infer<typeof updatePhoneAndRoleSchema>;
