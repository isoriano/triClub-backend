import { Schema, model, Document } from 'mongoose';

export interface AthleteDocument extends Document {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const athleteSchema = new Schema<AthleteDocument>(
  {
    userId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const AthleteModel = model<AthleteDocument>('Athlete', athleteSchema);
