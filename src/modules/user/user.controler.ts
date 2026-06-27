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

    const {accessToken}=req.cookies
    console.log(accessToken)
const verifiedToken=jwtUtils.verifyToken(accessToken,config.jwt_secret_access)
console.log(verifiedToken)


if(typeof verifiedToken==="string"){

    throw new Error(verifiedToken);
    
}

const profile=await userService.getMyProfileDB(verifiedToken.userId)

sendResponse (res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"user profile feached successfully",
    data:{profile}

})
})


export const userController={
    registerUser,
    getMyProfile
}