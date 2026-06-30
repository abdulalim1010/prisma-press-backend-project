import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { postService } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const id=req.user?.userId
const payload=req.body;
const result=await postService.createPost(payload,id as string)
sendResponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"Post created successfully",
    data:result
})
});

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const result=await postService.getAllposts();
sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"post retrived successfully",
    data:result
})
});

const getPostbyId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const postId=req.params.postId;

console.log("Post ID =", postId);
if(!postId){
    throw new Error("post Id Requried In params");
    
}
const result=await postService.getPostbyId(postId as string)
sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"the post successfully retrived",
    data:result
})



});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const authorId=req.user?.userId;
const result=await postService.getMyPost(authorId as string)

sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"my post retrived successfully",
    data:result
})

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
    getPostbyId,
    getMyPosts,
    getPostStats,
    updatePost,
    deletePost,
};