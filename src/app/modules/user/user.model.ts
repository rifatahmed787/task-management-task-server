import { Schema, Types, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import bcrypt from 'bcrypt'
import config from '../../../config'

// And a schema that knows about IUserMethods
const UserSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
    },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

//isUserExist  static method finding by user email
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { email },
    { _id: 1, role: 1, password: 1, email: 1, name: 1, imageUrl: 1 }
  ).lean()
}
//isUserExist  static method finding by user _id
UserSchema.statics.isUserExistByID = async function (
  _id: Types.ObjectId | string
): Promise<Partial<IUser> | null> {
  return await User.findById(_id).lean()
}

//isPhone Number Exist
UserSchema.statics.isEmailExist = async function (
  email: string
): Promise<boolean> {
  const isExist = await User.findOne({
    email: email,
  })

  return isExist ? true : false
}

//password check method
UserSchema.statics.isPasswordMatched = async function (
  encrypted_pass: string,
  given_pass: string
): Promise<boolean> {
  return await bcrypt.compare(given_pass, encrypted_pass)
}

// Checking  phone number (Just for valid message)
UserSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    email: this.email,
  })

  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already user created by this email address'
    )
  } else {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    )
    next()
  }
})

export const User = model<IUser, UserModel>('User', UserSchema)
