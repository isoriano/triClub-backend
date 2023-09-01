import { Request, Response } from 'express';
import { userService, teamService } from '../services';
import { log as logger } from '../utils';
import { NewTeamInput } from '../schemas/team.schema';

export const GetTeamHandler = async (
  req: Request<{ uid: string }, unknown, unknown>,
  res: Response
) => {
  const uid = (req as any).auth.sub;

  try {
    const team = await teamService.GetTeam(uid);
    if (!team) {
      throw new Error('No team on the DB linked with the UID sent');
    }
    return res.send(team);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const CreateTeamHandler = async (
  req: Request<unknown, unknown, NewTeamInput['body']>,
  res: Response
) => {
  const uid: string = (req as any).auth.sub;

  try {
    const user = await userService.GetUser(uid);
    if (!user) {
      throw new Error('No user on the DB linked with the UID sent');
    }

    const newTeam = await teamService.CreateTeam({
      ...req.body,
      uid: '',
      user_admin_id: uid,
      logo_id: '63c143921d893c835e582dfa',
    });

    const team = await teamService.GetTeam(newTeam.uid);

    return res.send(team);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
