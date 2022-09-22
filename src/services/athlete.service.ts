import { DocumentDefinition } from 'mongoose';

import { AthleteDocument, AthleteModel } from '../models';

export const GetAthlete = async (userId: string) => {
  try {
    return await AthleteModel.findOne({ userId });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const CreateAthlete = async (
  input: DocumentDefinition<Omit<AthleteDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await AthleteModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};
