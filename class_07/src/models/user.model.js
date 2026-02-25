import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "with this email user already exists"]
  },
  password: String
})

const userModel = mongoose.model("users", userSchema)

export default userModel