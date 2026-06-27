import { Request, Response, Router } from "express";
import { userController } from "./user.controler";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
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

router.get(
  "/me",
  (req: Request, res: Response, next) => {
    console.log(req.cookies);
   const {accessToken}=req.cookies
      
      console.log(accessToken)
      
  const verifiedToken=jwtUtils.verifyToken(accessToken,config.jwt_secret_access)



  
  
  
  if(typeof verifiedToken==="string"){
  
      throw new Error(verifiedToken);
     
  }
 const {email,name,userId,role}=verifiedToken
  const requiredROles=[Role.ADMIN,Role.USER,Role.AUTHOR]  
  if (!requiredROles.includes(role))
    return res.status(403).json({

        success:false,
        statusCode:httpStatus.FORBIDDEN,
        message:"the FORBIDDEN the permissoin is access this resource"
})
req.user={
email,name,userId,role}


    next();
  },
  userController.getMyProfile
);

export const userRouter = router;