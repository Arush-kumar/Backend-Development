const express = require('express')
const UserModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')


/*
  - POST /api/auth/register
*/
authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const isUserAlreadyExists = await UserModel.findOne({ email })
  if(isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email. Please login."
    })
  }

  const user = await UserModel.create({
    username,
    email,
    password
  })

  const token = jwt.sign({
    id: user._id,
    email: user.email
  }, process.env.JWT_SECRET)

  res.cookie('jwt_token', token)
  res.status(201).json({
    message: "User register successfully.",
    user,
    token
  })
})


module.exports = authRouter