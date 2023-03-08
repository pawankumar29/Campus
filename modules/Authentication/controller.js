import jwt from "jsonwebtoken";
import response from "../../response-handlers/response.js";
import httpStatus from 'http-status-codes';
import { authenicationMessage } from "../../core/constant/authenticationMessages.js";

class authenication{


login=async(req,res)=>{
     try {
           if(req.user){
               console.log("rrr--->",req.user);
          const {_id,email}=req.user;
          const obj={
               user_id:_id,
               email:email
          }
       
          const token= jwt.sign(obj,process.env.jwtSecretKey);
          response.response(res,httpStatus.OK,authenicationMessage.DATA_FOUND,token)
          
         
     }
     else{ const errorMessage = req.flash('error')[0] || 'Data Invalid';
     console.log(errorMessage);
     throw new Error(errorMessage);}
     
        
     } catch (error) {
          response.response(res,httpStatus.BAD_REQUEST,error.message)

     }

}









}


export default new  authenication();