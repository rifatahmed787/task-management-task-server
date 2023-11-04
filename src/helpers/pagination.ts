import { SortOrder } from 'mongoose'
import { IPagination } from '../interfaces/pagination'

type IPaginationMap = IPagination & {
  skip: number
  sortObject: { [key: string]: SortOrder }
}

export const pagination_map = (
  pagination_data: Partial<IPagination>
): IPaginationMap => {
  const page = Number(pagination_data.page || 1)
  const limit = Number(pagination_data.limit || 30)
  const skip = (page - 1) * limit

  const sortBy = pagination_data.sortBy || 'createdAt'
  const sortOrder = pagination_data.sortOrder || 'desc'

  const sortObject = { [sortBy]: sortOrder }

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    sortObject,
  }
}
