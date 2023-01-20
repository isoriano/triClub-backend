import { Request, Response } from 'express';

import { UpdateUserInput, UserInput } from '../schemas/user.schema';
import * as service from '../services';
import { log as logger } from '../utils';

export const GetUserHandler = async (req: Request, res: Response) => {
  const uid = (req as any).auth.sub;

  try {
    const userDetails = await service.GetUser(uid);
    return res.send(userDetails);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const GetProfileHandler = async (req: Request, res: Response) => {
  const uid = (req as any).auth.sub;

  try {
    const profile = await service.GetProfile(uid);
    return res.send(profile);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const CreateUserHandler = async (
  req: Request<unknown, unknown, UserInput['body']>,
  res: Response
) => {
  try {
    const user = await service.CreateUser(req.body);
    // await CreateAthlete({
    //   userId: user.id,
    // });
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const UpdateUserHandler = async (
  req: Request<unknown, unknown, UpdateUserInput['body']>,
  res: Response
) => {
  try {
    const uid = (req as any).auth.sub;
    await service.UpdateUser(uid, req.body);
    const user = await service.GetUser(uid);
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const RequestPasswordChangeHandler = async (
  req: Request<unknown, unknown, unknown>,
  res: Response
) => {
  try {
    const uid = (req as any).auth.sub;
    const aux = await service.auth.RequestPasswordChange(uid);

    return res.send(aux);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const UpdateAvatarHandler = async (
  req: Request<unknown, unknown, { avatarId: string }>,
  res: Response
) => {
  try {
    const uid = (req as any).auth.sub;
    await service.UpdateUser(uid, { avatar_id: req.body.avatarId });
    const avatar = await service.GetAvatarImage(req.body.avatarId);
    return res.send(avatar);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
