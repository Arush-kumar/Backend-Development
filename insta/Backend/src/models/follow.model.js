import mongoose from "mongoose"

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true })

const followModel = mongoose.model("follow", followSchema)

export default followModel
