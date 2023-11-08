import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_task_conditions } from './task.condition'
import ApiError from '../../errors/ApiError'
import {
  ITask,
  ITaskFilter,
  ITaskFilteringItems as ITaskUniqueFilteringItems,
} from './task.interface'
import { Task } from './task.model'
import { User } from '../user/user.model'
import { IUser } from '../user/user.interface'
import httpStatus from 'http-status'
import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

// Create new task
const create_new_task = async (
  task_data: ITask,
  user_data: JwtPayload
): Promise<ITask | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    user_data?._id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const created_task = await Task.create(task_data)

  return created_task
}

//  gel_all_imcomplete_tasks
const gel_all_incomplete_tasks = async (
  filers: ITaskFilter,
  pagination_data: Partial<IPagination>,
  user_data: JwtPayload
): Promise<GenericResponse<ITask[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Define the conditions to filter tasks based on filers and the user's ID
  const IsConditions = {
    ...filter_task_conditions(filers),

    // Filter tasks added by the user
    added_by: user_data._id,
    done: false,
  }

  // Count only the tasks added by the user
  const total = await Task.countDocuments(IsConditions)

  // Query the tasks with the same conditions
  const all_tasks = await Task.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total, // Total tasks added by the user
    },
    data: all_tasks,
  }
}

// get all complete tasks
const get_all_complete_tasks = async (
  filers: ITaskFilter,
  pagination_data: Partial<IPagination>,
  user_data: JwtPayload
): Promise<GenericResponse<ITask[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Define the conditions to filter tasks based on filers and the user's ID
  const IsConditions = {
    ...filter_task_conditions(filers),

    // Filter tasks added by the user
    added_by: user_data._id,
    done: true,
  }

  // Count only the tasks added by the user
  const total = await Task.countDocuments(IsConditions)

  // Query the tasks with the same conditions
  const all_tasks = await Task.find(IsConditions)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)

  return {
    meta: {
      page: page,
      limit: limit,
      total: total, // Total tasks added by the user
    },
    data: all_tasks,
  }
}

//  gel_all_title
const get__unique_filtering_items =
  async (): Promise<GenericResponse<ITaskUniqueFilteringItems> | null> => {
    // and conditions (for search and filter)
    const titles = await Task.distinct('titles')

    return {
      data: { titles },
    }
  }

//task details
const get_task_details = async (id: string): Promise<ITask | null> => {
  const isExist = await Task.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
  }

  //
  const task_details = await Task.findById(id).populate('added_by')

  return task_details
}

// Update task
const update_task = async (
  task_data: Partial<ITask>,
  task_id: Types.ObjectId | string,
  owner_id: Types.ObjectId
): Promise<ITask | null> => {
  // task User checking

  if (
    !(await Task.validateTaskOwnership(task_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this task'
    )
  }

  const updated_task_data = await Task.findByIdAndUpdate(task_id, task_data, {
    new: true,
  }).populate('added_by')

  if (!updated_task_data) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to update task data'
    )
  }

  return updated_task_data
}

// make complete the task
const doneTask = async (
  task_id: string | Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<ITask | null> => {
  if (
    !(await Task.validateTaskOwnership(task_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not the valid owner for this task'
    )
  }

  const task = await Task.findById(task_id)

  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
  }

  // Toggle the 'done' status
  task.done = !task.done

  // Save the updated task
  const updatedTask = await task.save()

  return updatedTask
}

//  Delete task
const delete_task = async (
  task_id: string | Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<ITask | null> => {
  // book User checking
  if (
    !(await Task.validateTaskOwnership(task_id as Types.ObjectId, owner_id))
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not valid owner for this task'
    )
  }

  const task = await Task.findByIdAndDelete(task_id).populate('added_by')

  if (!task) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete task')
  }

  return task
}

export const TaskServices = {
  create_new_task,
  update_task,
  gel_all_incomplete_tasks,
  get_task_details,
  delete_task,
  get__unique_filtering_items,
  doneTask,
  get_all_complete_tasks,
}
