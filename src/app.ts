import config from 'config';
import cors from 'cors';
import express from 'express';

import { routes } from './routes';
import { mongoDbConnect, log as logger } from './utils';

const port = config.get<number>('server.port');
const host = config.get<string>('server.host');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, host, async () => {
  logger.info(`API is running ar http://${host}:${port}`);

  await mongoDbConnect();

  routes(app);
});
