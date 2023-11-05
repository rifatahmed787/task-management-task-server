import { Schema, Types, model } from 'mongoose'
import { ITask, TaskModel } from './task.interface'

// And a schema that knows about IUserMethods

const TaskSchema = new Schema<ITask, TaskModel>({
  title: { type: String, required: true },
  deadline: { type: String, required: true },
  description: { type: String, required: true },
  cover_image: { type: String, required: false },
  keynotes: { type: [String], required: false },
  done: { type: Boolean, required: true },
  added_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//validateTaskOwnership
TaskSchema.statics.validateTaskOwnership = async function (
  task_id: Types.ObjectId,
  owner_id: Types.ObjectId
): Promise<Partial<ITask> | null> {
  const task = await Task.findOne({
    _id: new Types.ObjectId(task_id),
    added_by: new Types.ObjectId(owner_id),
  }).lean()

  return task
}

//istaskAvailable
TaskSchema.statics.isTaskAvailable = async function (
  id: Types.ObjectId
): Promise<Partial<ITask> | null> {
  return await Task.findById(id).lean()
}

export const Task = model<ITask, TaskModel>('Task', TaskSchema)
