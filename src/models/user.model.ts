import { Schema, model, Document } from 'mongoose';
import { File } from './file.model';

export interface UserDocument extends Document {
  uid: string;
  name: string;
  email: string;
  dob?: Date;
  avatar_id?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    avatar_id: { type: String }
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
