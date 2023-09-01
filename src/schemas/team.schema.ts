import { object, string, TypeOf, date } from 'zod';

export const NewTeamSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    })
  }),
});

export type NewTeamInput = TypeOf<typeof NewTeamSchema>;
