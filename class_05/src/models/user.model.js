const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: [ true, "Email is already taken."]
  },
  password: String
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel