import config from 'config';
import cors from 'cors';
import express from 'express';

import { routes } from './routes';
import { mongoDbConnect, log as logger } from './utils';

const port = config.get<number>('port');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(10000, '0.0.0.0', async () => {
  logger.info(`API is running ar http://localhost:${port}`);

  await mongoDbConnect();

  routes(app);
});
