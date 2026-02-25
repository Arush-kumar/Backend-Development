import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


const authRouter = express.Router();

/*
  - POST /api/auth/register
*/
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
    });
  }

  const user = await userModel.create({ email, name, password, });


  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  )

  res.cookie("jwt_token", token)

  res.status(201).json({
    message: "User register successfully",
    user,
    token
  });
});


/*
  - POST /api/auth/login
*/
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordMatched = user.password === password;

  if (!isPasswordMatched) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  )

  res.cookie("jwt_token", token)

  res.status(200).json({
    message: "User login successfully",
    user,
    token
  });
});

export default authRouter;