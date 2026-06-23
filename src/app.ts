import cookieParser from "cookie-parser";
import  express , { Application, Request, Response } from "express"
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prsima";
import sttpStatus from "http-status";
import bcrypt from "bcryptjs";

const app:Application=express()

app.use(express.json()),
app.use(express.urlencoded({extended:true})),
app.use(cookieParser())
app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.get("/",(req:Request,res:Response)=>{
   
    res.send("hellow world")

})
app.get("/api/users/register",async(req:Request,res:Response)=>{
  const {name,email,password,profilePhoto}=req.body;
  const userExist=await prisma.user.findUnique({
    where:{
        email   }})
        if (userExist) {throw new Error("user already exist")}



        const hashedPassword=await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))
        const createdUser=await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                
            }

        })
  await prisma.profile.create({
            data:{
                userId:createdUser.id,
                profilePhoto,
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



  res.status(sttpStatus.CREATED).json({
    success:true,
    statusCode:sttpStatus.CREATED,
    data:
    {user},
    message:"user register successfully"})
})
export default app;