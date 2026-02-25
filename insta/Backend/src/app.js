import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// const morgan = require("morgan")


app.use(express.json())
app.use(cookieParser())
// app.use(morgan("dev"))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))


/* require routes */
import authRouter from './routes/auth.routes.js';
import postRouter from './routes/post.routes.js';
import userRouter from './routes/user.routes.js';

/* using routes */
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)


export default app