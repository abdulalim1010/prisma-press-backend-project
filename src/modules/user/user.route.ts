import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prsima";
import config from "../../config";

import bcrypt from "bcryptjs";
import sttpStatus from "http-status";
import { userController } from "./user.controler";

const router=Router()
router.post("/register",userController.registerUser)
export const userRouter=router