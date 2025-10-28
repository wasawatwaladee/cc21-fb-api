import createHttpError from "http-errors"

export const notFoundMiddleware=(req,res,next)=>{
    return next(createHttpError.NotFound("Path not found"))
}