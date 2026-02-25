import express from 'express';
const postRouter = express.Router();
import * as postController from '../controllers/post.controller.js';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });
import identifyUser from '../middlewares/auth.middleware.js';


/**
 * @route POST /api/posts [protected]
 * @description create a post with content and image (optional) provided in the request body. The post should be associated with the user that the request come from
*/
/*    POST /api/posts/   */
postRouter.post('/', upload.single('image'), identifyUser, postController.createPostController)


/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */
postRouter.get('/', identifyUser, postController.getPostsController)


/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController)



/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postRouter.post('/like/:postId', identifyUser, postController.likePostController)


/**
 * @route POST /api/posts/feed
 * @description get all posts created in DB
 * @access Private 
 */
postRouter.get('/feed', identifyUser, postController.getFeedController)


export default postRouter