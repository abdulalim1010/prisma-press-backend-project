import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { postService } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getPostStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

export const postController = {
    createPost,
    getAllPosts,
    getSinglePost,
    getMyPosts,
    getPostStats,
    updatePost,
    deletePost,
};