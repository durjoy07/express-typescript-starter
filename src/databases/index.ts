/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DB_HOST, DB_PORT, DB_DATABASE, CLUSTER_URI } from '@config';

export const dbConnection = {
  url: CLUSTER_URI || 'mongodb://localhost:27017/speed', //`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  options: {},
};
