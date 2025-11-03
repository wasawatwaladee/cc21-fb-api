import prisma from "../config/prisma.config.js"

export const getAllPosts= async(req,res)=>{
    const result = await prisma.post.findMany({
        orderBy:{createdAt : 'desc'},
        include:{
            user:{select:{
                firstName:true,lastName:true,profileImage:true
            }}
        }
    })
    res.json({posts:result})
}


export const createPost = async(req , res ,next)=>{
    const{message,image} = req.body
    const data = {message,image,userId:req.user.id}
    const result = await prisma.post.create({data})
    res.status(201).json(
        {
        message:'Create new Post done',
        result
        })
}
