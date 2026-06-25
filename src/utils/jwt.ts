import jwt ,{ JwtPayload, SignOptions } from "jsonwebtoken"

const createToken=(payload:JwtPayload,secrete:string,expersIn:SignOptions)=>{
    const token=jwt.sign(payload,secrete,
        
        {expersIn}as SignOptions
    )
    return token

}



export const jwtUtils= {
    createToken
}