import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import sttpStatus from "http-status";

const loginUser=catchAsync(async(req:Request, res:Response, next:NextFunction) => {
      console.log("req.body =", req.body);
    const payload=req.body

const loginResult=await authService.loginUser(payload)
sendResponse(res,{
    success:true,
    statusCode:sttpStatus.OK,
    message:"Login successful",
    data:loginResult   

})
})

export const authController={
loginUser
}