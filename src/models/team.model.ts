import { Schema, model, Document } from 'mongoose';

export interface TeamDocument extends Document {
  uid: string;
  name: string;
  user_admin_id: string;
  logo_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    user_admin_id: { type: String, required: true },
    logo_id: { type: String },
  },
  {
    timestamps: true,
  }
);

export const TeamModel = model<TeamDocument>('Team', teamSchema);
