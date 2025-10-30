import express from "express";
import authRoute from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import shutdownUtil from "./utils/shutdown.util.js";
import prisma from "./config/prisma.config.js";
import cors from 'cors'

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], //allow origins
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, //allow all cookies if needed
}))
app.use(express.json());

// app.use('/api/shutdown',(req,res)=>{
//     shutdownUtil('SIGTERM')
// })

//Routes
app.use('/api/auth',authRoute);
// app.use('/api/auth/login',(req,res)=>{res.send(req.body.identity)})
// app.use('/api/auth',(req,res)=>{res.send('auth service')})
app.use('/api/post',(req,res)=>{res.send('post service')});
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