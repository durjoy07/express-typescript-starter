import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  BASE_URL,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  CLUSTER_URI,
  JWT_SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  AUTH_ID,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
