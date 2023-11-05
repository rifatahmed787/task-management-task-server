import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { UploadRoute } from '../app/modules/cloudinary/upload.route'
import { TaskRoute } from '../app/modules/tasks/task.routes'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/upload', router: UploadRoute },
  { path: '/', router: UserRoute },
  { path: '/users', router: UserRoute },
  { path: '/tasks', router: TaskRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
