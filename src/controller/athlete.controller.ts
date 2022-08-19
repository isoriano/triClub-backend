import { Request, Response } from "express";
import { GetUser, GetAthlete } from "../services";
import { log as logger } from "../utils";

export const getAthleteHandler = async (
  req: Request<{ uid: string }, {}, {}>,
  res: Response
) => {
  const uid = req.params.uid;

  try {
    const user = await GetUser(uid);
    if (!user) {
      throw new Error("No user on the DB linked with the UID sent");
    }
    const athlete = await GetAthlete(user._id);
    return res.send({ user, athlete });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
