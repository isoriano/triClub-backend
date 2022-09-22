import config from 'config';
import { Express } from 'express';

import {
  getAthleteHandler,
  getUserHandler,
  createUserHandler,
} from './controller';
import { jwtCheck } from './middleware/jwt-check';
import { ValidateResource } from './middleware/validate-resource';
import { UserSchema } from './schemas/user.schema';

const version = config.get<number>('version');

export const routes = (app: Express) => {
  app.get('/api/sambori', (req, res) => res.send(`Sambori! v.${version}`));

  app.get('/api/athlete/:uid', jwtCheck, getAthleteHandler);
  app.get('/api/users/:uid', jwtCheck, getUserHandler);
  app.post('/api/users', jwtCheck, ValidateResource(UserSchema), createUserHandler);
  app.put('/api/users', jwtCheck, ValidateResource(UserSchema), createUserHandler);
};
