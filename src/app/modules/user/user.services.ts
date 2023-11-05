/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { IUser } from './user.interface'
import { User } from './user.model'
import ApiError from '../../errors/ApiError'
import { hashingHelper } from '../../../helpers/hashingHelper'

//MY  profile
const my_profile = async (id: string): Promise<Partial<IUser> | null> => {
  const isExist = await User.findById(id, {
    name: 1,
    email: 1,
    imageUrl: 1,
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  return isExist
}

const allUsers = async (): Promise<IUser[]> => {
  const result = await User.find({}, { email: 1, name: 1, imageUrl: 1 })
  return result
}

// update_user_profile
const update_user_profile = async (
  user_data: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const isUserExist: IUser | null = await User.isUserExistByID(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const { name, password, ...other_user_data } = user_data
  const userData: Partial<IUser> = { ...other_user_data }

  // Name updating handle
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key: string) => {
      const name_key = `name.${key}` as keyof Partial<IUser>
      ;(userData as any)[name_key] = name[key as keyof typeof name]
    })
  }

  // // phone  updating handle
  // if (phoneNumber && (await User.isPhoneNumberExist(phoneNumber))) {
  //   throw new ApiError(
  //     httpStatus.CONFLICT,
  //     'Already same number used for a user'
  //   )
  // }

  // password  updating handle
  if (password) {
    userData.password = await hashingHelper.encrypt_password(password)
  }

  const updated_user_data = await User.findByIdAndUpdate(id, userData, {
    new: true,
    projection: { name: 1, phoneNumber: 1, _id: 0 },
  })

  if (!updated_user_data) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to update user')
  }

  return updated_user_data
}

export const UserServices = {
  my_profile,
  allUsers,
  update_user_profile,
}
