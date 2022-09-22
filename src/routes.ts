import { Express } from 'express';

import {
  getAthleteHandler,
  getUserHandler,
  createUserHandler,
} from './controller';
import { jwtCheck } from './middleware/jwt-check';
import { ValidateResource } from './middleware/validate-resource';
import { UserSchema } from './schemas/user.schema';

export const routes = (app: Express) => {
  app.use(jwtCheck);

  app.get('/api/athlete/:uid', getAthleteHandler);
  app.get('/api/users/:uid', getUserHandler);
  app.post('/api/users', ValidateResource(UserSchema), createUserHandler);
  app.put('/api/users', ValidateResource(UserSchema), createUserHandler);
};
