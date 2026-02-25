import followModel from "../models/follow.model"
import userModel from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerController = async (req, res) => {

  const { username, email, password, bio, profileImage } = req.body;

  // check points in single check with or operator same as above
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res
      .status(400)
      .json({
        message:
          "User already exists" +
          (isUserAlreadyExist.email === email
            ? " with email"
            : " with username"),
      });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password:hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};


async function followUserController(req, res){

  console.log(req.params);

  const followerId = req.user.id; // Aapki ID (middleware se)
  const followingId = req.params.id; // Jise follow karna hai

  console.log(`followerId ${followerId} followingId ${followingId}`);
  

  if(followerId.toString() === followingId){
    return res.status(400).json({
      message: "You cannot follow yourself"
    })
  }


  const isFollowerIdExist = await userModel.findOne({
    _id: followerId
  })

  if (!isFollowerIdExist) {
    return res.status(404).json({
      message: "User your are to trying to follow does not exist."
    })
  }

  const targetUser  = await userModel.findById({
    _id: followingId
  })

  if (!targetUser) {
    return res.status(404).json({
      message: "User your are trying to follow does not exist."
    })
  }

  
  const existingFollow = await followModel.findOne({
    follower: followerId,
    following: followingId
  })
  
  
  if (existingFollow){
    return res.status(200).json({
      message: `You have already sent a request or are following ${targetUser.username}`,
        status: existingFollow.status
    })
  }

// followerId and followingId 
// For Private Account Follow System
  const followRecord = await followModel.create({
  follower: followerId,
  following: followingId,
  status: "accepted" // suppose direct follow ho raha hai 
})

res.status(201).json({
  message: `Follow request sent to ${targetUser.username}`,
  followRecord
})


// Samne wale ki (Following ki) 'followersCount' +1 karein
    await userModel.findByIdAndUpdate(followingId, { 
      $inc: { followersCount: 1 } 
    });

    res.status(200).json({
      message: "Followed successfully",
      followRecord
    });


}

const unfollowUserController = async (req, res) => {
    const followerId = req.user.id; // Aapki ID (Token se)
    const { followingId } = req.params; // Jise unfollow karna hai

    // 1. Check karein ki kya pehle se follow record exist karta hai?
    const existingFollow = await followModel.findOne({
      follower: followerId,
      following: followingId
    });

    if (!existingFollow) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // 2. Follow Record ko Database se Delete karein
    await followModel.deleteOne({ _id: existingFollow._id });

    // 3. Counts Decrease (-1) karein
    
    // Aapki (Follower ki) 'followingCount' -1 karein
    await userModel.findByIdAndUpdate(followerId, { 
      $inc: { followingCount: -1 } 
    });

    // Samne wale ki (Following ki) 'followersCount' -1 karein
    await userModel.findByIdAndUpdate(followingId, { 
      $inc: { followersCount: -1 } 
    });

    res.status(200).json({
      message: "Unfollowed successfully"
    });

  }


async function pendingFollowRequestController(req, res){

  const currentUsername = req.user.username

  const pendingRequests = await followModel.find({
    following: currentUsername,
    status: "pending"
  })

  res.status(200).json({
    message: "Pending follow requests",
    pendingRequests
  })
}

async function acceptFollowRequestController(req, res){

  const currentUsername = req.user.username
  const followerUsername = req.params.username

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: currentUsername
  })

  if(!followRequest){
    return res.status(404).json({
      message: "Follow request not found"
    })
  }

  if(followRequest.status === "accepted"){
    return res.status(400).json({
      message: "Follow request already accepted"
    })
  }

  followRequest.status = "accepted"
  await followRequest.save()

  res.status(200).json({
    message: "Follow request accepted successfully",
    followRequest
  })
}

async function rejectFollowRequestController(req, res){

  const currentUsername = req.user.username
  const followerUsername = req.params.username

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    following: currentUsername
  })

  if(!followRequest){
    return res.status(404).json({
      message: "Follow request not found"
    })
  }

  if(followRequest.status === "rejected"){
    return res.status(400).json({
      message: "Follow request already rejected"
    })
  }

  followRequest.status = "rejected"
  await followRequest.save()

  res.status(200).json({
    message: "Follow request rejected",
    followRequest
  })
}


export default {
  followUserController,
  unfollowUserController,
  pendingFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  registerController
}