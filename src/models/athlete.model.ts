import { Schema, model, Document } from "mongoose";

import { Sport } from "./sport.model";

export interface AthleteDocument extends Document {
  userId: number;
  sports: Sport[];
  createdAt: Date;
  updatedAt: Date;
}

const athleteSchema = new Schema<AthleteDocument>(
  {
    userId: { type: Number, required: true, unique: true },
    sports: { type: Array<Sport>(), default: [] },
  },
  {
    timestamps: true,
  }
);

export const AthleteModel = model<AthleteDocument>("Athlete", athleteSchema);
