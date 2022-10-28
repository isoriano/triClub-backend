import { Schema, model, Document } from 'mongoose';

export interface AthleteDocument extends Document {
  userId: string;
  dob?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const athleteSchema = new Schema<AthleteDocument>(
  {
    userId: { type: String, required: true, unique: true },
    dob: { type: Date }
  },
  {
    timestamps: true,
  }
);

export const AthleteModel = model<AthleteDocument>('Athlete', athleteSchema);
