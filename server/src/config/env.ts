import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),

  NODE_ENV: process.env.NODE_ENV,

  FRONTEND_URL:
    process.env.FRONTEND_URL,

  SUPABASE_URL: process.env.SUPABASE_URL,

  SUPABASE_ANON_KEY:
    process.env.SUPABASE_ANON_KEY,

  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY,
};