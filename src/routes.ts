import config from 'config';
import { Express } from 'express';

import {
  getAthleteHandler,
  uploadController,
  UpdateAvatarHandler,
  GetProfileHandler,
  CreateUserHandler,
  UpdateUserHandler,
  GetUserHandler,
  RequestPasswordChangeHandler
} from './controller';
import { jwtCheck } from './middleware/jwt-check';
import { ValidateResource } from './middleware/validate-resource';
import { UserSchema } from './schemas/user.schema';
import { log as logger } from './utils';

const version = config.get<number>('version');

export const routes = (app: Express) => {
  app.get('/api/sambori', (req, res) => res.send(`Sambori! v.${version}`));

  app.get('/api/athlete/:uid', jwtCheck, getAthleteHandler);

  app.post('/api/users', jwtCheck, ValidateResource(UserSchema), CreateUserHandler);

  app.get('/api/user', jwtCheck, GetUserHandler);
  app.get('/api/user/change-password', jwtCheck,  RequestPasswordChangeHandler);
  app.get('/api/user/profile', jwtCheck, GetProfileHandler);
  app.put('/api/user/avatar', jwtCheck, UpdateAvatarHandler);
  app.put('/api/user', jwtCheck, UpdateUserHandler);

  app.get('/api/file/:uid', jwtCheck, uploadController.getFileHandler);
  app.post('/api/upload', jwtCheck, uploadController.storeFile().single('file'), (req, res) => {
    if (req.file == undefined) {
      return res.send({
        message: 'You must select a file.',
      });
    }

    return res.send({
      file: req.file
    });
  });

  logger.info('Routes Loaded');
};
