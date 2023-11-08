import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'

export type ITask = {
  title: string
  deadline: string
  description: string
  cover_image?: string
  done: boolean
  keynotes?: string[]
  added_by: Types.ObjectId | IUser
}

export type TaskModel = {
  validateTaskOwnership(
    task_id: Types.ObjectId,
    owner_id: Types.ObjectId
  ): Promise<Partial<ITask> | null>
  isTaskAvailable(id: Types.ObjectId | string): Promise<Partial<ITask> | null>
} & Model<ITask>

export type ITaskFilter = {
  title?: string
  searchTerm?: string
}

export type ITaskFilteringItems = {
  titles: string[]
}
