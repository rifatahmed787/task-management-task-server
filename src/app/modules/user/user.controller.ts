import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { UserServices } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

//get all user
const allUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.allUsers()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'users retrieved successfully',
  })
})

//  Get   user profile information
const userProfile = catchAsync(async (req: Request, res: Response) => {
  const { _id: user_id } = req.logged_in_user

  const result = await UserServices.my_profile(user_id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "User's information retrieved successfully",
  })
})

// userProfileUpdate
// const userProfileUpdate = catchAsync(async (req: Request, res: Response) => {
//   const { _id: user_id } = req.logged_in_user
//   const { ...user_data } = req.body
//   const result = await UserServices.update_user_profile(user_data, user_id)

//   sendResponse(res, {
//     status_code: httpStatus.OK,
//     success: true,
//     data: result,
//     message: "User's information updated successfully",
//   })
// })

export const UserController = {
  userProfile,
  allUsers,
  // userProfileUpdate,
}
