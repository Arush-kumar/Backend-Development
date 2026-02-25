import express from "express"
import userController from "../controllers/user.controller"
import identifyUser from "../middlewares/auth.middleware"

const userRouter = express.Router()

/** 
 * POST /api/auth/register
*/
userRouter.post('/register', userController.registerController)

/** 
 * @route POST /api/users/follow/:userid
 * @description follow a user 
 * @access Private
*/
userRouter.post('/follow/:id', identifyUser, userController.followUserController)

/** 
 * @route POST /api/users/unfollow/:userid
 * @description follow a user 
 * @access Private
*/
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowUserController)

/*
 * GET /api/users/follow/pending
 *  @description View pending follow requests
 * @access Private
*/
// View pending requests
userRouter.get('/follow/pending', identifyUser, userController.pendingFollowRequestController)


/*
 * PATCH /api/users/follow/accept/:username
 *  @description View accept follow requests
 * @access Private
*/
// Accept request
userRouter.patch('/follow/accept/:username', identifyUser, userController.acceptFollowRequestController)


/*
 * PATCH /api/users/follow/reject/:username
 *  @description View reject follow requests
 * @access Private
*/
// Reject request
userRouter.patch('/follow/reject/:username', identifyUser, userController.rejectFollowRequestController)



export default userRouter