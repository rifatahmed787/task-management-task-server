/* eslint-disable @typescript-eslint/no-explicit-any */
import { task_search_condition_keys } from './task.constant'
import { ITaskFilter } from './task.interface'

export const filter_task_conditions = (
  filers: ITaskFilter
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { searchTerm, ...filter_keys } = filers

  const conditions = []

  if (searchTerm) {
    conditions.push({
      $or: task_search_condition_keys.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  //
  if (Object.keys(filter_keys).length) {
    conditions.push({
      $and: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'title') {
          return { title: { $regex: '^' + value } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { $and: conditions } : undefined
}
