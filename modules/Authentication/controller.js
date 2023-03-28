import jwt from "jsonwebtoken";
import response from "../../response-handlers/response.js";
import httpStatus from 'http-status-codes';
import { authenicationMessage } from "../../core/constant/authenticationMessages.js";
import { admin } from "../../models/adminModel/adminSchema.js";
import { status } from "../../helpers/commonVariables.js";
import crypto from "crypto"
import { sendMail } from "../../helpers/commonFunctions.js";

class authenication{

login = async (req, res) => {
     try {

       if (req.user) {

         const {_id, email} = req.user;
         const obj = {
           user_id: _id,
           email: email
         }
   
         const token = jwt.sign(obj, process.env.jwtSecretKey);
         response.response(res, httpStatus.OK, authenicationMessage.DATA_FOUND, token)
   
       } else {
         throw new Error(errorMessage);
       }
     } catch (error) {
       response.response(res, httpStatus.BAD_REQUEST,0, error.message)
     }
   }
   

 forgot_password=async(req,res)=>{
   try {
    const Email=req.body.email;
    console.log(Email);
    const checkUserExist=await admin.findOne({email:Email});
console.log("c-->",checkUserExist);
    if(!checkUserExist){
      response.response(res,httpStatus.BAD_REQUEST,status.fail,authenicationMessage.DATA_NOT_FOUND)
    }
    
    const token=crypto.randomBytes(20).toString("hex"); // genertaing unique token

     checkUserExist.resetPasswordToken=token; 
     checkUserExist.resetPasswordTokenExpire=Date.now()+(30*60*1000) // converting time to milliseconds
   
     await checkUserExist.save();

     // send email 
       
     const result=await sendMail(Email,token,checkUserExist.name);

     if(result.status){
        response.response(res,httpStatus.OK,status.success,authenicationMessage.DATA_SENT_SUCCESSFULLY)
     }
     else{
       throw new Error(result.message)
     }

   } catch (error) {
    response.response(res,httpStatus.BAD_REQUEST,status.fail,error.message);
   }

}


resetPassword=async(req,res)=>{
   
  try {

    const {token,passowrd,confirmPassword}=req.body;
      
    if(passowrd===confirmPassword){

     const query={
      resetPasswordToken:token,
      resetPasswordTokenExpire:{$gt:Date.now()}
     }

     const user=await admin.findOne(query); // here user is an instance to that object

     if(user){
       user.password=confirmPassword;
       user.resetPasswordToken=undefined;
       user.resetPasswordTokenExpire=undefined;

       await user.save();

     }
     else{
      throw new Error(authenicationMessage.DATA_NOT_FOUND)
     }
    }
    else
    throw new Error(authenicationMessage.PASSWORD_NOT_MATCH)
    
  } catch (error) {
    response.response(res,statusbar.BAD_REQUEST,status.fail,error.message);
  }
}

}


export default new  authenication();