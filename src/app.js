import express from "express";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

const app = express();
app.use(express.json());

//Routes
app.use('/api/auth',authRoute);
// app.use('/api/auth/login',(req,res)=>{res.send(req.body.identity)})
// app.use('/api/auth',(req,res)=>{res.send('auth service')})
app.use('/api/post',(req,res)=>{res.send('post service')});
app.use('/api/comment',(req,res)=>{res.send('comment service')});
app.use('/api/like',(req,res)=>{res.send('like service')});

//Middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware);

export default app;