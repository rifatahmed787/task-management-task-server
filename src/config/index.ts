/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
  default_student_password: process.env.DEFAULT_USER_PASSWORD,
  default_faculty_password: process.env.DEFAULT_USER_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    access_token_secret: process.env.JWT_SECRET,
    access_token_expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    refresh_token_expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
}
