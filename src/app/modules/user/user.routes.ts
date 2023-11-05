import express from 'express'
import { UserController } from './user.controller'

import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.get('/', UserController.allUsers)
router.get('/my-profile', authHandler(), UserController.userProfile)

export const UserRoute = router
