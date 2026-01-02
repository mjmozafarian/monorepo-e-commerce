import { z } from "zod";

export interface CustomJwtSessionClaims {
    metadata?: {
        role?: "user" | "admin"; // if there is no role, it is a regular user
    };
}

export const UserFormSchema = z.object({
    firstName: z
        .string({ message: "First name is required" })
        .min(2, "Full name must be at least 2 characters long")
        .max(50),
    lastName: z
        .string({ message: "Last name is required" })
        .min(2, "Last name must be at least 2 characters long")
        .max(50),
    userName: z
        .string({ message: "User name is required" })
        .min(2, "User name must be at least 2 characters long")
        .max(50),
    emailAddress: z
        .array(z.string("Invalid email address"))
        .min(1, "At least one email address is required"),
    password: z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long")
        .max(50),
});
