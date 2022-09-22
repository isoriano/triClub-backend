import { DocumentDefinition } from "mongoose";

import { UserDocument, UserModel } from "../models";

export const GetUser = async(id: string) => {
  try {
    return await UserModel.findOne({uid: id});
  } catch (error: any) {
    throw new Error(error);
  }
}

export const CreateUser = async (
  input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt">>
) => {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
