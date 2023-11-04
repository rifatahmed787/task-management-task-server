export type IUser_role = 'seller' | 'buyer' | 'admin'

export type ILocations =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export type IMeta = {
  page: number
  limit: number
  total: number
}

export type GenericResponse<T> = {
  meta?: IMeta
  data: T
}
