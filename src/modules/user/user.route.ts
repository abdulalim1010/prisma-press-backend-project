import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controler";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prsima";
import { auth } from "../../middleware/auth";
import { authController } from "../auth/auth.controller";
const router = Router();





router.post("/register", userController.registerUser);







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



router.put(
  "/my-profile",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  userController.updatedMyProfile
);

export const userRouter = router;