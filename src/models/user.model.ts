import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  uid: string;
  name: string;
  email: string;
  avatar_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar_id: { type: String }
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
