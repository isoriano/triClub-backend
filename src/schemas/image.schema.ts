import { object, string, array, number } from 'zod';

export const ImageSchema = object({
  body: object({
    description: string(),
    contentType: string(),
    size: number(),
    img: array(number()),
  }),
});
