import * as z from "zod";

export const NameSchema = z.string().min(1, {
  message: "name cannot be empty",
});
export type NameType = z.infer<typeof NameSchema>;

export const EmailSchema = z.string().email({
  message: "invalid email",
});
export type EmailType = z.infer<typeof EmailSchema>;

export const PasswordSchema = z
  .string()
  .min(8, {
    message: "password needs to be atleast 6 characters",
  });
export type PasswordType = z.infer<typeof PasswordSchema>;

export const RoleSchema = z.string();
export type RoleType = z.infer<typeof RoleSchema>;

export const UserSchema = z
  .object({
    email: EmailSchema,
    familyName: NameSchema,
    givenName: NameSchema,
    role: RoleSchema,
  })
  .readonly()
export type UserType = z.infer<typeof UserSchema>;
