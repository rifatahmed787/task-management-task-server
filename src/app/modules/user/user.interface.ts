import { Model, Types } from 'mongoose'
import { IUser_role } from '../../../interfaces/common'

export type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  _id?: Types.ObjectId
  email: string
  password: string
  name: IName
  imageUrl?: string
}

// Create a new Model type that knows about IUserMethods when available here...
export type UserModel = {
  isUserExist(email: string): Promise<IUser | null>
  isUserExistByID(_id: Types.ObjectId | string): Promise<IUser | null>
  isPasswordMatched(
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean>
  isEmailExist(email: string): Promise<boolean>
} & Model<IUser>

// User filter type
export type IUserFilter = {
  email?: string
  role?: IUser_role
  searchTerm?: string
}

// user login interface
export type IUserLogin = {
  email: string
  password: string
}

export type IUserLoginResponse = {
  accessToken: string
  user_details: Partial<IUser>
  refreshToken?: string
}
