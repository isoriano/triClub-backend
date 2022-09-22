import { Schema, model, Document } from 'mongoose';

import { Sport } from './sport.model';

export interface AthleteDocument extends Document {
  userId: string;
  dob?: Date;
  sports: Sport[];
  createdAt: Date;
  updatedAt: Date;
}

const athleteSchema = new Schema<AthleteDocument>(
  {
    userId: { type: String, required: true, unique: true },
    dob: { type: Date, required: false },
    sports: { type: Array<Sport>(), default: [] },
  },
  {
    timestamps: true,
  }
);

export const AthleteModel = model<AthleteDocument>('Athlete', athleteSchema);
