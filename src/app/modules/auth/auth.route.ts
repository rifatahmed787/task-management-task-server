import requestValidationHandler from '../../middlewares/requestValidationHandler'
import { AuthController } from './auth.controller'
import {
  user_login_zod_schema,
  user_refresh_token_zod_schema,
  user_signup_zod_schema,
} from './auth.validation'
import express from 'express'

const router = express.Router()

router.post(
  '/signup',
  requestValidationHandler(user_signup_zod_schema),
  AuthController.signupUser
)
router.post(
  '/login',
  requestValidationHandler(user_login_zod_schema),
  AuthController.loginUser
)

router.post(
  '/refresh-token',
  requestValidationHandler(user_refresh_token_zod_schema),
  AuthController.refreshToken
)

export const AuthRoute = router
