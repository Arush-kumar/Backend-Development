import postModel from "../models/post.model.js";
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";
import likeModel from "../models/like.model.js";


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT 
})


export async function createPostController(req, res) {
      // console.log("Headers:", req.headers['content-type']); 
      // console.log("File:", req.file); 
      // console.log("Body:", req.body); 


    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await imagekit.files.upload({ 
        file: await toFile(Buffer.from(req.file.buffer), 'file'), 
        fileName: req.file.originalname,
        folder: "insta-clone-posts"
    });
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

export async function getPostsController(req, res){

  const userId = req.user.id

  const posts =  await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: "Posts fetched successfully",
    posts
  })

}

export async function getPostDetailsController(req, res){

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


// export async function likePostController(req, res){

//   const username = req.user.username
//   const postId = req.params.postId

//   const post = await postModel.findById(postId)

//   if(!post) {
//     return res.status(404).json({
//       message: "Post not found"
//     })
//   }

//   const like = await likeModel.create({
//     post: postId,
//     user: username
//   })

//   res.status(200).json({
//     message: "Post likes successfully",
//     like
//   })

// }
export async function likePostController(req, res) {
  try {
    const userId = req.user.id; // ID use karein, username nahi
    const postId = req.params.postId;

    // 1. Check karein post exist karti hai ya nahi
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 2. Check karein kya user ne pehle se like kiya hai?
    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId
    });

    if (existingLike) {
      // Agar like mil gaya, to UNLIKE kar dein (Delete)
      await likeModel.findByIdAndDelete(existingLike._id);
      return res.status(200).json({ 
        message: "Post unliked successfully",
        isLiked: false
      });
    }

    // 3. Agar like nahi kiya, to Naya LIKE create karein
    const like = await likeModel.create({
      post: postId,
      user: userId
    });

    res.status(200).json({
      message: "Post liked successfully",
      isLiked: true
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}


export async function getFeedController(req, res){

  const user = req.user // req.user is coming from auth middleware

  // console.log("Full User Object:", req.user); // id and username

  const posts = await Promise.all((await postModel.find().populate("user").lean())
  .map(async (post) => {
    
    const isLiked = await likeModel.findOne({
                user: user.id,
                post: post._id
            })

            post.isLiked = !!isLiked

            return post
  }))

  res.status(200).json({
    message: "Posts fetch successfully.",
    posts
  })
}
