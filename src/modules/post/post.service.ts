import { prisma } from "../../lib/prsima";
import { ICcreatPostPayload } from "./post.interface";

const createPost = async (payload:ICcreatPostPayload,userId:string) => {
    const result=await prisma.post.create({
        data:{
            ...payload,
            authorId:userId
        }
    })
    return result
};

const  getAllposts = async () => {
    const posts=await prisma.post.findMany(

        {
            include:{
                author:{
                    omit:{
                        password:true
                    }
                },
                comments:true
            }
        }
    )

    return posts

};

const getPostbyId = async (postId: string) => {
  console.log("Service postId:", postId);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  console.log("Post =", post);

  if (!post) {
    throw new Error("Post not found");
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatedPost;
};

const getMyPost = async (authorId:string) => {

    const result=await prisma.post.findMany({
        where:{
            authorId
        },
        orderBy:{
            createdAt:"desc"
        },

        include:{
            comments:true,
            author:{
                omit:{
                    password:true
                }
            },
            _count:{
                select:{
                    comments:true
                }
            }
        }
    })
return result
};

const getPostStatsFromDB = async () => {

};

const updatePostIntoDB = async () => {

};

const deletePostFromDB = async () => {

};

export const postService = {
    createPost,
   getAllposts,
  getPostbyId ,
    getMyPost,
    getPostStatsFromDB,
    updatePostIntoDB,
    deletePostFromDB,
};