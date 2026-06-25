import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prsima"
import { ILoginUser } from "./auth.interface"


const loginUser=async(payload:ILoginUser )=>{
    const {email,password}=payload
    const user =await prisma.user.findUniqueOrThrow({
       where:{email} 
    })

   const isPasswordMatch=await bcrypt.compare(password,user.password)
   if(!isPasswordMatch){
    throw new Error("password is incorrect  ")

   }
   return user
    // Implementation for logging in a user 
}
export const authService={
    loginUser
}