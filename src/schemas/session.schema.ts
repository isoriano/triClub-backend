import { object, string, TypeOf } from "zod";

export const CreateSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required"
    }),
    password: string({
      required_error: "Password is required"
    })
  })
});
