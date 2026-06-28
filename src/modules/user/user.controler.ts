import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prsima";
import bcrypt from "bcryptjs";
import config from "../../config";
import sttpStatus from "http-status";
import { HttpStatus } from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";
import httpStatus from "http-status";




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
const getMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{



const profile=await userService.getMyProfileDB(req.user?.userId as string)

sendResponse (res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"user profile feached successfully",
    data:{profile}

})
})


const updatedMyProfile=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
const userId=req.user?.userId as string
const payload=req.body;
const updatedProfile=await userService.updatedMyProfileDB(userId,payload)
sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"user profile updated successfully",
    data: {
        updatedProfile
    }
})
})

export const userController={
    registerUser,
    getMyProfile,
    updatedMyProfile
}