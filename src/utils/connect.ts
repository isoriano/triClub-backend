import mongoose from 'mongoose';
import config from 'config';

import { log as logger } from './logger';
import { DbSettings } from '../models';

export const mongoDbConnect = async () => {
  const dbSettings = config.get<DbSettings>('db');

  try {
    const dbPath = `mongodb+srv://${dbSettings.user}:${encodeURIComponent(
      dbSettings.password
    )}@${dbSettings.clusterName}/?retryWrites=true&w=majority`;

    await mongoose.connect(dbPath);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
      console.log('Connected successfully');
    });
    db.on('connected', () => {
      const db1 = mongoose.connections[0].db;
      const bucket = new mongoose.mongo.GridFSBucket(db1, {
        bucketName: 'files',
      });
      console.log(bucket);
    });

    logger.info('DB Connected');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export const getDBConnection = (): string => {
  const dbSettings = config.get<DbSettings>('db');

  const dbPath = `mongodb+srv://${dbSettings.user}:${encodeURIComponent(
    dbSettings.password
  )}@${dbSettings.clusterName}/?retryWrites=true&w=majority`;

  return dbPath;
};
