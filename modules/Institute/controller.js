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
import { university } from "../../models/universityModel/universitySchema.js";
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
        console.log(isUniversityExist);
      if (isUniversityExist.status) {
        data.university = isUniversityExist.data;

        const query = {
          institute: data.institute,
          university: data.university,
        };
        const checkInstituteExistAlready = await findOne(institute, query);
      console.log("c--->",checkInstituteExistAlready);
        if (!checkInstituteExistAlready.status) {
          await institute.create(data);

          const file_path = req.file.path;

          const dataFromFile = await readCsvFile(file_path);

          if (dataFromFile.length) { 
            const validatedStudentData = validateStudentData(dataFromFile);
            if (validatedStudentData.status) {
              await students.insertMany(validatedStudentData);
              response.response(
                res,
                StatusCodes.OK,
                status.success,
                instituteMessage.DATA_ADDED,
                result.data
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
      };
      const result = await findWithPaginate(
        institute,
        query,
        project,
        pageNo,
        limitOfPage
      );

      if (result.status) {
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
