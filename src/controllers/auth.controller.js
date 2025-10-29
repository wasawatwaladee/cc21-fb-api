import createHttpError from "http-errors"

// @ts-nocheck
export const register=(req, res)=> {
 res.send('Register Controller')
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
