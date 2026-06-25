import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prsima";
import bcrypt from "bcryptjs";
import config from "../../config";
import sttpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";




const registerUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const payload=req.body
        const user=await userService.registerIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:sttpStatus.CREATED,
        message:"user register successfully",
        data:{user} 
    })
//   res.status(sttpStatus.CREATED).json({
//      success:true,
//     statusCode:sttpStatus.CREATED,
//      data:
//      {user},
//      message:"user register successfully"})
        
   
    


})


// const registerUser=async(req:Request,res:Response)=>{
//     try {const payload=req.body
//   const user=await userService.registerIntoDB(payload)
 


//   res.status(sttpStatus.CREATED).json({
//     success:true,
//     statusCode:sttpStatus.CREATED,
//     data:
//     {user},
//     message:"user register successfully"})
        
//     } catch (error) {
//         console.log(error)
//         res.status(sttpStatus.INTERNAL_SERVER_ERROR).json({
//             success:false,
//             statusCode:sttpStatus.INTERNAL_SERVER_ERROR,
//             message:"internal server error",
//             error:(error as Error).message
//         })
        
//     }
// }
export const userController={
    registerUser
}