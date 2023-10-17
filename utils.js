// import bcrypt from 'bcrypt'

// const createHash = (password) => 
// bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// const isValidatePassword = (user,password) => bcrypt.compareSync(password, user.password)

// export default {
//     createHash,
//     isValidatePassword
// }

import bcrypt from 'bcrypt';

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default     createHash

export function isValidatePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
