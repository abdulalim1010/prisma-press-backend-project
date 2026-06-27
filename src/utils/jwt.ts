import jwt ,{ JwtPayload, SignOptions } from "jsonwebtoken"

const createToken=(payload:JwtPayload,secrete:string,expiresIn:SignOptions)=>{
    const token=jwt.sign(payload,secrete,
        
        {expiresIn}as SignOptions
    )
    return token

}
const verifyToken=(token:string,secrete:string)=>{
   try {
    
     const verifyedToken=jwt.verify(token,secrete);
    return verifyToken
   } catch (error) {
console.log("token verification failded",error)
    throw new Error("Invalid Token");
    
    
   }
}

export const jwtUtils= {
    createToken,
    verifyToken
}