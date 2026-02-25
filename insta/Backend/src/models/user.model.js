import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/arushk/images.jpg?updatedAt=1770749014502",
  },
  followersCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
