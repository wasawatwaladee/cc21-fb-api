import createHttpError from "http-errors"
import IdentityKeyUtil from "../utils/identity-key.util.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { registerSchema } from "../validations/schema.js"


// @ts-nocheck
export const register=async(req, res ,next)=> {
 const {identity, firstName, lastName, password, confirmPassword} = req.body
 //validation
//  if(!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()){
//   throw new createHttpError("please fill all inputs")
//  } 

const rs = registerSchema.parse(req.body)
console.log(rs)
 

// if(confirmPassword !== password){
//   throw new createHttpError(446,'Recheck password & confirm password')
//  }

 //check Identity
 const identityKey = IdentityKeyUtil(identity)
 if(!identityKey){
  return next(createHttpError[400]('identity must be email or phone number'))
 }


//find user if already have registered
const haveUser = await prisma.user.findUnique({
  where:{[identityKey]:identity}
})

if(haveUser){
  return next(createHttpError(409,'This user already register'))
}

const newUser = {
  [identityKey] : identity ,
  password : await bcrypt.hash(password,5),
  firstName ,
  lastName,

}

  // สร้าง new user ใน database
   const result = await prisma.user.create({ data: newUser })
   res.json({ msg: `Register successful`, result })


}

export const login=(req,res,next)=>{   
  //use case
//   if(req.body.password === 'a1234'){
//     return next(createHttpError[400]('Bad password'))
//   }
  
    res.json({
   msg : 'Login Controller',
   body : req.body
 })
}

export const getMe = (req,res) => {
 res.json({msg : 'GetMe controller'})
}

