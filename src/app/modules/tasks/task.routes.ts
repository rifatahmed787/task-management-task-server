import express from 'express'
import requestValidationHandler from '../../middlewares/requestValidationHandler'

import { TaskController } from './task.controller'
import {
  create_task_zod_schema,
  update_task_zod_schema,
} from './task.validation'
import authHandler from '../../middlewares/authHandler'

const router = express.Router()

router.post(
  '/',
  authHandler(),
  requestValidationHandler(create_task_zod_schema),
  TaskController.createTask
)

router.get('/', authHandler(), TaskController.allTasks)

router.get('/unique-filter-items', TaskController.uniqueFilteringData)

router.get('/:id', TaskController.taskDetails)
router.put('/:id', authHandler(), TaskController.doneTask)

router.patch(
  '/:id',
  authHandler(),
  requestValidationHandler(update_task_zod_schema),
  TaskController.updateTask
)
router.delete('/:id', authHandler(), TaskController.deleteTask)

export const TaskRoute = router
