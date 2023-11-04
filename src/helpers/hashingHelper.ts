import bcrypt from 'bcrypt'
import config from '../config'

const encrypt_password = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))
}

export const hashingHelper = {
  encrypt_password,
}
