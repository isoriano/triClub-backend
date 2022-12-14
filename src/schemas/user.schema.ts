import { object, string, TypeOf, date } from 'zod';

export const UserSchema = object({
  body: object({
    uid: string({
      required_error: 'Auth0 UID is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email')
  }),
});

export type UserInput = TypeOf<typeof UserSchema>;

export const UpdateUserSchema = object({
  body: object({
    uid: string({
      required_error: 'Auth0 UID is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    dob: date({
      required_error: 'Date of Birth is required',
    }),
  }),
});

export type UpdateUserInput = TypeOf<typeof UpdateUserSchema>;
