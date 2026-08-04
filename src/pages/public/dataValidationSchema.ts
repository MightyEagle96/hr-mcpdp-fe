import { z } from "zod";

const LoginValidator = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  //firstName: z.string(),
});

const SignUpValidator = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),

  state: z.string(),
  registrationNumber: z.string(),
  stateOfPracticeId: z.number(),
  zoneId: z.number(),
  //otherNames: z.string(),
});

export const ValidationSchema = {
  LoginValidator,
  SignUpValidator,
};
