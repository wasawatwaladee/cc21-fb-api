import express from "express";
import cors from 'cors'
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import shutdownUtil from "./utils/shutdown.util.js";
import prisma from "./config/prisma.config.js";
import postRoute from "./routes/post.route.js";
import authenticateMiddleware from "./middlewares/authenticate.middleware.js";


const app = express();
app.use(morgan("dev"));
app.use(rateLimit({
    windowMs:1*60*1000,  //id เดียวกัน ยิงเกิน 100 ทีภายใน 3 นาที
    max:100
}));
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173"], //allow origins
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, //allow all cookies if needed
}));
app.use(express.json());

// app.use('/api/shutdown',(req,res)=>{
//     shutdownUtil('SIGTERM')
// })

//Routes
app.use('/api/auth',authRoute);
// app.use('/api/auth/login',(req,res)=>{res.send(req.body.identity)})
// app.use('/api/auth',(req,res)=>{res.send('auth service')})
app.use('/api/post',authenticateMiddleware,postRoute);
app.use('/api/comment',(req,res)=>{res.send('comment service')});
app.use('/api/like',(req,res)=>{res.send('like service')});

//Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// prisma.$executeRaw`show TABLES`.then(console.log)

//กด CTRL+C
process.on('SIGINT',()=>shutdownUtil('SIGINT'))
process.on('SIGBREAK',()=>shutdownUtil('SIGBREAK'))
//normal kill process
process.on('SIGTERM',()=>shutdownUtil('SIGTERM')) 

// Catch unhandled errors
process.on("uncaughtException", ()=>  shutdown('uncaughtException'))
process.on("unhandledRejection", ()=> shutdown('unhandledRejection'))

export default app;