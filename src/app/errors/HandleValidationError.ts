import mongoose from 'mongoose'
import {
  generic_error_type,
  modified_error_res_type,
} from '../../interfaces/error'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): modified_error_res_type => {
  const all_errors: generic_error_type[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message }
    }
  )

  return {
    status_code: 400,
    message: 'Validation Error;Some values are missing or incorrect',
    errorMessages: all_errors,
  }
}
