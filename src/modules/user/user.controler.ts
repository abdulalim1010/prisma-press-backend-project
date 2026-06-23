import { Request, Response } from "express";
import { prisma } from "../../lib/prsima";
import bcrypt from "bcryptjs";
import config from "../../config";
import sttpStatus from "http-status";
import { userService } from "./user.service";



const registerUser=async(req:Request,res:Response)=>{
    try {const payload=req.body
  const user=await userService.registerIntoDB(payload)
 


  res.status(sttpStatus.CREATED).json({
    success:true,
    statusCode:sttpStatus.CREATED,
    data:
    {user},
    message:"user register successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(sttpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            statusCode:sttpStatus.INTERNAL_SERVER_ERROR,
            message:"internal server error"
        })
        
    }
}
export const userController={
    registerUser
}