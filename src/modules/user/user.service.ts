import { prisma } from "../../lib/prsima"
import bcrypt from "bcryptjs"
import status from "http-status"
import config from "../../config"
import { RegisterUserPayload } from "./interface"

  


const registerIntoDB=async (payload:RegisterUserPayload)=>{
   
     const {name,email,password,profilePhoto}=payload;
     const userExist=await prisma.user.findUnique({
    where:{
        email   }})
        if (userExist) {throw new Error("user with this email already exists")}



        const hashedPassword=await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))
        const createdUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                profile:{
                    create:{
                        profilePhoto
                    }
                }
            }

        })

      const user=await prisma.user.findUnique({
        where:{
            id:createdUser.id,
            email:createdUser.email||email
        },
        omit:{
            password:true
        },  
        include:{
            profile:true
        }
      })
return user
}

const getMyProfileDB=async(userId:string)=>{
    const user=await prisma.user.findUniqueOrThrow({
        where:{id:userId},
        omit:{
            password:true
        },
        include:{
            profile:true
        }
    })
    return user;

}
export const userService={
    registerIntoDB,
    getMyProfileDB
}