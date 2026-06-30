import { PostStatus } from "../../../generated/prisma/enums";


export interface ICcreatPostPayload{
    title :string;
    content:string;
    thumbnail?:string;
    isFeatured?:boolean;
    statsus?:PostStatus;
    tags:string[]
}