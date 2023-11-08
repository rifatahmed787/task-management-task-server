import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { TaskServices } from './task.services'
import pick from '../../../shared/pick'
import { task_filter_keys } from './task.constant'
import { pagination_keys } from '../../../constant/common'

// Create task
const createTask = catchAsync(async (req: Request, res: Response) => {
  const { ...task_data } = req.body
  console.log(task_data)
  const user_data = req.logged_in_user
  task_data.added_by = user_data._id //set the task author using user _id
  task_data.done = false //set the task status false by default
  const result = await TaskServices.create_new_task(task_data, user_data)
  console.log(result)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Task created successfully',
  })
})

//  updateTask
const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id: task_id } = req.params
  const { _id: owner_id } = req.logged_in_user

  const { ...task_data } = req.body
  const result = await TaskServices.update_task(task_data, task_id, owner_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Task updated successfully',
  })
})

//  Get all tasks
const allTasks = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, task_filter_keys)
  const pagination = pick(req.query, pagination_keys)
  const user_data = req.logged_in_user

  const result = await TaskServices.gel_all_incomplete_tasks(
    filers,
    pagination,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tasks retrieved successfully',
  })
})

// get all complete task
const getCompleteTask = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, task_filter_keys)
  const pagination = pick(req.query, pagination_keys)
  const user_data = req.logged_in_user

  const result = await TaskServices.get_all_complete_tasks(
    filers,
    pagination,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tasks retrieved successfully',
  })
})

//  Get all tasks
const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskServices.get__unique_filtering_items()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Filtering Items retrieved successfully',
  })
})

//   Get task Details
const taskDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await TaskServices.get_task_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Task details retrieved successfully',
  })
})

const doneTask = catchAsync(async (req: Request, res: Response) => {
  const { id: task_id } = req.params
  const { _id: user_id } = req.logged_in_user
  const result = await TaskServices.doneTask(task_id, user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Task Completed successfully',
  })
})

//  Delete task
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id: task_id } = req.params
  const { _id: user_id } = req.logged_in_user
  const result = await TaskServices.delete_task(task_id, user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Task deleted successfully',
  })
})

export const TaskController = {
  createTask,
  taskDetails,
  updateTask,
  deleteTask,
  allTasks,
  uniqueFilteringData,
  doneTask,
  getCompleteTask,
}
