import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import identifyUser from '../middlewares/auth.middleware.js';


const authRouter = express.Router()

/** 
 * POST /api/auth/login
*/
authRouter.post('/login', authController.loginController)


/** 
 * POST /api/auth/logout
*/
authRouter.post('/logout', authController.logoutController)

/** 
 * @route GET /api/auth/get-me
 * @description get the currently user logged in 
 * @access Private
*/

authRouter.get('/get-me', identifyUser,authController.getMeController)

export default authRouter