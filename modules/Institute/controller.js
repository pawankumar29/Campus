import { StatusCodes } from "http-status-codes";
import instituteMessage from "../../core/constant/instituteMessage.js";
import { status } from "../../helpers/commonVariables.js";
import { findOne, findWithPaginate } from "../../models/instituteModel/instituteModel.js";
import { institute } from "../../models/instituteModel/instituteSchema.js";
import response from "../../response-handlers/response.js";

class instituteController{

  addInstitute=async(req,res)=>{
     try {

        const instituteName=req.body.institute;
        const query={
            institute:instituteName,
            is_deleted:0
        }

        const isAlreadyExist=await findOne(institute,query);

        if(isAlreadyExist.status){
            throw new Error(instituteMessage.ALREADY_EXIST)
        }
        else{
          
            const result=await institute.create(req.body);

            response.response(res,StatusCodes.OK,status.success,instituteMessage.DATA_ADDED,result)

        }
        
     } catch (error) {
        response.response(res,StatusCodes.BAD_REQUEST,status.fail,error.message)
     }
    }



     getInstituteList=async(req,res)=>{
       try {
       const {page,limit}=req.body;
       const pageNo= page||instituteMessage.page;
       const limitOfPage=limit||instituteMessage.limit;

       const query={
        is_deleted:0
       }

       const project={
        institute:1,
        qualification:1,
        tpo_name:1,
        studentCount:1,

       }
       const result=await findWithPaginate(institute,query,project,pageNo,limitOfPage);

       if(result.status){
         
        response.response(res,StatusCodes.OK,status.success,instituteMessage.DATA_FOUND,result.data)

       }
        
       } catch (error) {
        response.response(res,StatusCodes.BAD_REQUEST,status.fail,error.message)
       }



     }

  }







export default   instituteController



