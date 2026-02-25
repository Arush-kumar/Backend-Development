import postModel from "../models/post.model.js";
import ImageKit from '@imagekit/nodejs'; 
import { toFile } from "@imagekit/nodejs"; 
import jwt from "jsonwebtoken";
import followModel from "../models/follow.model.js";
import likeModel from "../models/like.model.js";


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {
    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-clone-posts"
    })

    // res.send(file)

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
      message: "Post created successfully",
      post
    })

}

async function getPostsController(req, res){

  const userId = req.user.id

  const posts =  await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: "Posts fetched successfully",
    posts
  })

}

async function getPostDetailsController(req, res){

  const userId = req.user.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message: "Post not found"
    })
  }

  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(403).json({
      message: "Forbidden Content."
    })
  }

  res.status(200).json({
    message: "Post details fetched successfully",
    post
  })


}


async function likePostController(req, res){

  const username = req.user.username
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post) {
    return res.status(404).json({
      message: "Post not found"
    })
  }

  const like = await likeModel.create({
    post: postId,
    user: username
  })

  res.status(200).json({
    message: "Post likes successfully",
    like
  })

}


async function getFeedController(req, res){

  const user = req.user

  const posts = await Promise.all((await postModel.find().populate("user").lean())
  .map(async (post) => {
    
    const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = !!(isLiked)

            return post
  }))

  res.status(200).json({
    message: "Posts fetch successfully.",
    posts
  })
}

export {
    createPostController,
    getPostsController,
    getPostDetailsController,
    likePostController,
    getFeedController
}