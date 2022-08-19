import { Request, Response } from "express";

import { UserInput } from "../schemas/user.schema";
import { CreateAthlete, CreateUser, GetUser } from "../services";
import { log as logger } from "../utils";

export const getUserHandler = async (
  req: Request<{ uid: string }, {}, {}>,
  res: Response
) => {
  const uid = req.params.uid;

  try {
    const user = await GetUser(uid);
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const createUserHandler = async (
  req: Request<{}, {}, UserInput["body"]>,
  res: Response
) => {
  try {
    const user = await CreateUser(req.body);
    await CreateAthlete({
      userId: user.id,
      sports: [],
    });
    return res.send(user);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
