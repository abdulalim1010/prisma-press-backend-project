import { Response } from "express"

type Tmeta={
    page?:number,
    limit?:number,
    total?:number
}
type ResponseData<T>={
    success:boolean,
    statusCode:number,  
    message:string,
    data:T,
    meta?:Tmeta}

export const sendResponse=<T>(res:Response,Data:ResponseData<T>)=>{
res.status(Data.statusCode).json({
    success:Data.success,
    statusCode:Data.statusCode,
    message:Data.message,
    data:Data.data,
    meta:Data.meta
})}