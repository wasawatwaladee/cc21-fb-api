import createHttpError from "http-errors";
import jwt from 'jsonwebtoken'
import { getUserBy } from "../services/user.service.js";

export default async (req,res,next)=>{
    const authorization = req.headers.authorization
    console.log('authorization', authorization)
    if(!authorization || !authorization.startsWith('Bearer ')){
        throw createHttpError[401]('Unauthorized1')
    }
    const token =  authorization.split(' ')[1]
    console.log('token', token)
    if(!token){
        throw createHttpError[401]('Unauthorized2')
    }

    const payload = jwt.verify(token,process.env.JWT_SECRET)
    console.log('payload', payload)

    const foundUser = await getUserBy('id',payload.id)
    if(!foundUser){
        throw createHttpError[401]('Unauthorized 3')
    }
    const {password , createdAt,updatedAt , ...userData} = foundUser
    /// userData ตั้งชื่อเองได้
    req.user = userData 
    next()
}