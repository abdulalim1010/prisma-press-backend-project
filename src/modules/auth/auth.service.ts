import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prsima"
import { ILoginUser } from "./auth.interface"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import config from "../../config"
import { jwtUtils } from "../../utils/jwt"
import { verify } from "node:crypto"



const loginUser=async(payload:ILoginUser )=>{
    const {email,password}=payload
    const user =await prisma.user.findUniqueOrThrow({
       where:{email} 
    })

   const isPasswordMatch=await bcrypt.compare(password,user.password)
   if(!isPasswordMatch){
    throw new Error("password is incorrect  ")
    

   }
   const jwtPayload={
  userId: user.id,
    name:user.name, 
email:user.email ,
    role:user.role   
   }

// const accessToken=jwt.sign(jwtPayload,config.jwt_secret_access,
//     {expiresIn:config.jwt_access_expires_in}as SignOptions

// )
const accessToken=jwtUtils.createToken(jwtPayload ,
    config.jwt_secret_access,config.jwt_access_expires_in as SignOptions);

// const refreshToken=jwt.sign(jwtPayload,config.jwt_refresh_secret,
//     {expiresIn:config.jwt_refresh_expires_in} as SignOptions
   
// )     
const refreshToken=jwtUtils.createToken(jwtPayload,config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions)

   return { user, accessToken, refreshToken }
    // Implementation for logging in a user 
} 

const refreshToken=async(refreshToken:string)=>{
    const verifyRefreshToken=jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret);


    if(!verifyRefreshToken.success){
        throw  Error(verifyRefreshToken.error);
        
    }
const {id}=verifyRefreshToken.data as JwtPayload;
const user=await prisma.user.findFirstOrThrow({
    where:{
id
    }
})
if(user.activeStatus==="BLOCKED"){
    throw new Error("usr is blocked");
    
}

const JwtPayload=
{
    id,
    name:user.name,
    email:user.email,
    role:user.role
}
const accessToken=jwtUtils.createToken(
    JwtPayload,
    config.jwt_secret_access,
    config.jwt_access_expires_in as SignOptions
);


return{accessToken}


}




export const authService={
    loginUser,
    refreshToken
}