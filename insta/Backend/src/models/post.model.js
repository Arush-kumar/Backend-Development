import mongoose from "mongoose"


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    
}, {
    timestamps: true
})


const postModel = mongoose.model("posts", postSchema)

export default postModel