import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controler";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prsima";
const router = Router();
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




router.post("/register", userController.registerUser);



const auth=(...requiredROles:Role[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>
        {
        const token=req.cookies.accessToken
        //  || 
        // req.headers.authorization?.startsWith("Bearer")?req.headers.authorization?.split(" ")[1]
        // :req.headers.authorization;

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




router.get(
  "/me",
//   (req: Request, res: Response, next) => {
//     console.log(req.cookies);
//    const {accessToken}=req.cookies
      
//       console.log(accessToken)
      
//   const verifiedToken=jwtUtils.verifyToken(accessToken,config.jwt_secret_access)



  
  
  
// if(!verifiedToken.success){
//     throw new Error(verifiedToken.error);
    
// }
//  const {email,name,userId,role}=verifiedToken.data as JwtPayload


//   const requiredROles=[Role.ADMIN,Role.USER,Role.AUTHOR]  
//   if (!requiredROles.includes(role))
//     return res.status(403).json({

//         success:false,
//         statusCode:httpStatus.FORBIDDEN,
//         message:"the FORBIDDEN the permissoin is access this resource"
// })
// req.user={
// email,name,userId,role}


//     next();
//   },



auth(Role.ADMIN,Role.AUTHOR,Role.USER),
  userController.getMyProfile
);

export const userRouter = router;