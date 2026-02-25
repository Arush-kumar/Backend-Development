import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  /**
   * username
   * password
   *
   * email
   * password
   */

  /**
   * { username: undefined, email: test@test.com, password: test } = req.body
   */

  const user = await userModel.findOne({
    $or: [{ 
      username: username 
    }, {
      email: email 
    }],
  }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn Successfully.",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};


const logoutController = async (req, res) => {

  res.clearCookie("token")

  res.status(200).json({
    message: "User LoggedOut Successfully."
  })
}

const getMeController = async (req, res) => {

  const userId = req.user.id

  const user = await userModel.findById(userId)

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })
}

export {
  loginController,
  getMeController,
  logoutController
};
