import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prsima";



declare global{
    namespace Express{
        interface Request{
          user?:{
            name:string,
            email:string,
            userId:string,
            role:Role
          }
        }
    }
}




export const auth=(...requiredROles:Role[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>
        {
        const token=req.cookies.accessToken?  req.cookies.accessToken: req.headers.authorization?.startsWith("Bearer")?req.headers.authorization?.split(" ")[1]
         :req.headers.authorization;

        if(!token)
            {throw new Error("you are not loogded access to the resourcees");
        }
          const verifiedToken=jwtUtils.verifyToken(token,config.jwt_secret_access)



  
  
  
if(!verifiedToken.success){
    throw new Error(verifiedToken.error);
    
}
 const {email,name,userId,role}=verifiedToken.data as JwtPayload
 if(requiredROles.length &&!requiredROles.includes(role)){

    throw new Error("forbidden you are not permition to the resources");
    
 }

 const user=await  prisma.user.findUnique({
    where:{
        id:userId,
        name,
        email,
        role
        
    }
    
 })
 if(!user){
    throw new Error("user not  found login agian");
    
 }
 if(user.activeStatus==="BLOCKED") {
    throw new Error("your acoutn hasebeen blocked please contact to the authorization");
    
 }
 req.user={
    email,
    name,
    userId,
    role
 }
 next()
    }
)
}