export const errorMiddleware = (err,req,res,next)=>{
     console.log(err.message)
    res.status(err.status || 500)
    .json({
        status:err.status || 500,
        message: err.message || 'Internal Server Error'
    })
}