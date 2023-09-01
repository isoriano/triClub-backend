import { DocumentDefinition } from 'mongoose';

import { TeamDocument, TeamModel } from '../models';
import { GetFileById } from './upload.service';

export const CreateTeam = async (
  input: DocumentDefinition<Omit<TeamDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await TeamModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetTeam = async (uid: string) => {
  try {
    const team = await TeamModel.findOne({ uid });
    if (!team) {
      throw new Error('Team not found');
    }

    let logo = undefined;
    if (team.logo_id) {
      logo = await GetFileById(team.logo_id);
    }

    return { team, logo };
  } catch (error: any) {
    throw new Error(error);
  }
};
