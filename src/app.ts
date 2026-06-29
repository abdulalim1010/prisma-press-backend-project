import cookieParser from "cookie-parser";
import  express , { Application, Request, Response } from "express"
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prsima";
import sttpStatus from "http-status";
import bcrypt from "bcryptjs";
import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.routes";

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
// app.get()
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("api/comments",postRouter)




export default app;