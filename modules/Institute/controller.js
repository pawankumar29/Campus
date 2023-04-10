import { StatusCodes } from "http-status-codes";
import instituteMessage from "../../core/constant/instituteMessage.js";
import {
  findOne,
  findWithPaginate,
  readCsvFile,
} from "../../helpers/commonFunctions.js";
import { status } from "../../helpers/commonVariables.js";
import { institute } from "../../models/instituteModel/instituteSchema.js";
import { validateStudentData } from "../../models/studentModel/studentModel.js";
import { students } from "../../models/studentModel/studentSchema.js";
import {  university} from "../../models/universityModel/universitySchema.js";
import response from "../../response-handlers/response.js";

class instituteController {
  addInstitute = async (req, res) => {
    try {

      const { tpo_name, tpo_email, tpo_phone_number, qualification } = req.body;
     
      const data = {
        tpo_email: tpo_email,
        university: req.body.university,
        institute: req.body.institute,
        tpo_phone_number: tpo_phone_number,
        qualification: qualification,
        tpo_name: tpo_name,
      };

      const findUniversityId = {
        is_deleted: 0,
        name: data.university,
      };

      const idOnly = {
        name:data.university
      };

      const isUniversityExist = await findOne(university, idOnly);
       
      if (isUniversityExist.status) {
        data.university = isUniversityExist.data;

        const query = {
          institute: data.institute,
          university: data.university,
        };
        const checkInstituteExistAlready = await findOne(institute, query);
   
        if (!checkInstituteExistAlready.status) {
         

          const file_path = req.file.path;

          const dataFromFile = await readCsvFile(file_path);
          data.studentCount=dataFromFile.length;

          const instituteData= await institute.create(data);

          if (dataFromFile.length) { 
            const validatedStudentData = validateStudentData(dataFromFile);
            validatedStudentData.data.forEach(element => {
              element.institute_id=instituteData._id;
            });
        
          
            if (validatedStudentData.status) {
            
              await students.insertMany(validatedStudentData.data);
              response.response(
                res,
                StatusCodes.OK,
                status.success,
                instituteMessage.DATA_ADDED,
                
              );
            } else {
              throw new Error(JSON.stringify(validatedStudentData.Error));
            }
          }
        } else {
          throw new Error(instituteMessage.ALREADY_EXIST);
        }
      }
      else
      throw new Error(instituteMessage.UNIVERSITY_NOT_EXIST);


    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };

  getInstituteList = async (req, res) => {
    try {
      const { page, limit } = req.body;
      const pageNo = page || instituteMessage.page;
      const limitOfPage = limit || instituteMessage.limit;

      const query = {
        is_deleted: 0,
      };

      const project = {
        institute: 1,
        qualification: 1,
        tpo_name: 1,
        studentCount: 1,
        university:1
      };
       
     
      const results=await institute.findOne(query,project);
      console.log("r-->",results);
      const result = await findWithPaginate(
        institute,
        query,
        project,
        pageNo,
        limitOfPage
      );

      if (result.status) {
        
        // university adding

        result.data.forEach(async(data)=>{
              const universityData=await university.findOne({_id:data.university});
              console.log("u--->",universityData)
                   data["universityName"]=universityData.name
                   console.log("d-->",data);
        })
           console.log("k--->",result.data)
        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          result.data
        );
      }
    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };
}

export default instituteController;
