import { DocumentDefinition } from 'mongoose';

import { UserDocument, UserModel } from '../models';
import { GetFileById } from './upload.service';

export const GetProfile = async (uid: string) => {
  try {
    const user = await GetUser(uid);
    return { ...user, settingsOne: {} };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetUser = async (uid: string) => {
  try {
    const user = await UserModel.findOne({ uid });
    if (!user) {
      throw new Error('User not found');
    }

    let avatar = undefined;
    if (user.avatar_id) {
      avatar = await GetFileById(user.avatar_id as string);
    }

    return { user, avatar };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const CreateUser = async (
  input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    return UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const UpdateUser = async (
  uid: string,
  update: Partial<UserDocument>
) => {
  try {
    return UserModel.findOneAndUpdate({ uid }, update);
  } catch (error: any) {
    throw new Error(error);
  }
};
