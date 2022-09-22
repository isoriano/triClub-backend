import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
