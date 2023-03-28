import jwt from "jsonwebtoken";
import response from "../../response-handlers/response.js";
import httpStatus from 'http-status-codes';
import { authenicationMessage } from "../../core/constant/authenticationMessages.js";
import { admin } from "../../models/adminModel/adminSchema.js";
import { status } from "../../helpers/commonFunction.js";

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
         const errorMessage = req.flash('error')[0] || 'Data Invalid';
         console.log(errorMessage);
   
         // Handle authentication failure due to incorrect password
         if (errorMessage === 'Incorrect password') {
           throw new Error('Incorrect password');
         }
   
         throw new Error(errorMessage);
       }
     } catch (error) {
       response.response(res, httpStatus.BAD_REQUEST,0, error.message)
     }
   }
   

 forgot_password=async(req,res)=>{
   try {
    const email=req.body.email;
    const checkUserExist=await admin.findOne({email:email});

    if(!checkUserExist){
      response.response(res,httpStatus.BAD_REQUEST,status.fail,authenicationMessage.DATA_NOT_FOUND)
    }
   
    
    
   } catch (error) {
    
   }






}






}


export default new  authenication();