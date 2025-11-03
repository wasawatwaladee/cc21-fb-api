import createHttpError from "http-errors"
import IdentityKeyUtil from "../utils/identity-key.util.js"
import bcrypt from "bcryptjs"
import { loginSchema, registerSchema } from "../validations/schema.js"
import jwt from "jsonwebtoken"
import { createUser, getUserBy } from "../services/user.service.js"

// @ts-nocheck
export const register = async (req, res, next) => {
 const { identity, firstName, lastName, password, confirmPassword } = req.body
 // validation
 const user = registerSchema.parse(req.body)
 const identityKey = user.email ? 'email' : 'mobile'
 // find user if already have registered
 const haveUser = await getUserBy(identityKey,identity)
 if (haveUser) {
   return next(createHttpError[409]('This user already register'))
 }

 const newUser = {...user,password:await bcrypt.hash(password,10)}
 const result = await createUser(newUser)
 res.json({
   message: 'Register Successful',
   result: result
 })
}


export const login = async (req, res, next) => {
 const { identity, password } = req.body
 const user = loginSchema.parse(req.body)
const identityKey = user.email ? 'email' : 'mobile'
 const foundUser = await getUserBy(identityKey,identity)
 // have no this user
 if(!foundUser) {
   return next(createHttpError[401]('Invalid Login'))
 }
 // check password
 let pwOk = await bcrypt.compare(password, foundUser.password)
 if(!pwOk) {
   return next(createHttpError[401]('Invalid Login'))
 }
 const payload = { id: foundUser.id }
 const token = jwt.sign(payload, process.env.JWT_SECRET, {
   algorithm: 'HS256',
   expiresIn: '15d'
 })
 const {password: pw, createdAt, updatedAt, ...userData} = foundUser
 res.json({
   message: 'Login Successful',
   token: token,
   user : userData
 })
}


export const getMe = (req,res) => {
 res.json({user:req.user})
}

