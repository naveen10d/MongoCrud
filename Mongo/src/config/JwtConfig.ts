import * as jwt from 'jsonwebtoken';

export class Jwt{
    constructor(){
      }
    async generateToken(employee_id:String):Promise<String>{
      const token= await jwt.sign({ id:employee_id},`${process.env.SECRET_KEY}`, {
    expiresIn: 86400 
  });
  return token;
 }

 

 async verifyToken(req:any,res:any ,next:any):Promise<any>{
     const token = req.headers && req.headers['authorization'];
    if(!token) res.status(401).send({authorization:false,message:'No token provided.', status:401});
    return await jwt.verify(token,`${process.env.SECRET_KEY}`,(err: any,decoded: any)=>{
      if(err)res.status(500).send ({authorization:false,message:'Failed to authenticate Token', status:500});
    
      else{
        next()  
      }
    })
    
}
}