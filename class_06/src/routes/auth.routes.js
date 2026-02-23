const express = require('express')
const UserModel = require('../models/user.model')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


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


/*
  - POST /api/auth/protected
*/
authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Protected Route"
  })
})


/** 
  - POST /api/auth/login
*/
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email })

  if (!user) {
    return res.status(404).json({
      message: "User not found with this email address"
    })
  }

  const isPasswordMatched = user.password == crypto.createHash("md5").update(password).digest("hex")

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid Password"
    })
  }

  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SECRET)

  res.cookie("jwt_token", token)

  res.status(200).json({
    message: "User login successfully",
    user
  })

})

module.exports = authRouter