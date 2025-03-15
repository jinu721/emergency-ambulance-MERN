import { Request,Response,NextFunction } from "express";

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err.stack);
    const errStatusCode = err.statusCode || 500;
    const errMessage = err.message || 'Something went weong in server';
    res.status(errStatusCode).json({message:errMessage});
}

