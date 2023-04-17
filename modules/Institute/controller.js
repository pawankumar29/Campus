import { StatusCodes } from "http-status-codes";
import instituteMessage from "../../core/constant/instituteMessage.js";
import {
  deleteOne,
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
        isDeleted: 0,
        name: data.university,
      };

      const idOnly = {
        name: data.university,
      };

      const isUniversityExist = await findOne(university, idOnly);

      if (isUniversityExist.status) {
        data.university = isUniversityExist.data;

        const query = {
          institute: data.institute,
          university: data.university,
        };
        const checkInstituteExistAlready = await findOne(institute, query);
        console.log("pawan-->", !checkInstituteExistAlready.status);

        if (!checkInstituteExistAlready.status) {
          let file_path;
          if (req.file.path) file_path = req.file.path;
          else console.log("f--->", req.file);

          const dataFromFile = await readCsvFile(file_path);
          data.studentCount = dataFromFile.length;
          console.log("institute--->", dataFromFile);
          const instituteData = await institute.create(data);

          if (dataFromFile.length) {
            const validatedStudentData = validateStudentData(dataFromFile);
            validatedStudentData.data.forEach((element) => {
              element.institute_id = instituteData._id;
            });

            if (validatedStudentData.status) {
              await students.insertMany(validatedStudentData.data);
              response.response(
                res,
                StatusCodes.OK,
                status.success,
                instituteMessage.DATA_ADDED
              );
            } else {
              throw new Error(JSON.stringify(validatedStudentData.Error));
            }
          }
        } else {
          throw new Error(instituteMessage.ALREADY_EXIST);
        }
      } else throw new Error(instituteMessage.UNIVERSITY_NOT_EXIST);
    } catch (error) {
      console.log(error.message);
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
      const { page, limit, searchBy, startDate, endDate } = req.query;
      const pageNo = page || instituteMessage.PAGE;
      const limitOfPage = limit || instituteMessage.LIMIT;
      const Search = searchBy || "";
      const StartDate = startDate || "";
      const EndDate = endDate || "";

      let query;

      const project = {
        institute: 1,
        qualification: 1,
        university: "$university_data.name",
        institute_id: "$_id",
        _id: 0,
      };

      if (Search && Search != "") {
        query = {
          is_deleted: 0,
          $or: [
            { institute: { $regex: Search, $options: "i" } },
            {
              qualification: { $elemMatch: { $regex: Search, $options: "i" } },
            },
            { batch: Number(Search) },
          ],
        };
      } else if (StartDate && EndDate && StartDate != "" && EndDate != "") {
        // Input date in "dd/mm/yyyy" format

        // Split the input date by '/' to get day, month, and year parts
        const parts = StartDate.split("/");
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        // Create a new Date object using the day, month, and year parts
        const date1 = new Date(`${year}-${month}-${day}`);

        const parts2 = EndDate.split("/");
        const day2 = parts2[0];
        const month2 = parts2[1];
        const year2 = parts2[2];

        // Create a new Date object using the day, month, and year parts
        const date2 = new Date(`${year2}-${month2}-${day2}`);

        // Get the ISO string representation of the date
        const isoDate1 = date1.toISOString();
        const isoDate2 = date2.toISOString();

        query = {
          // time handled
          is_deleted: 0,
          // $or:[
          // {created_at:{$gte:isoDate1}},
          // {created_at:{$lte:isoDate2}}]  // not working in $match
          $expr: {
            $or: [
              {
                $gte: ["$created_at", "2023-04-11T00:00:00.000Z"],
              },
              {
                $lte: ["$created_at", "2023-04-13T00:00:00.000Z"],
              },
            ],
          },
        }; // here if we are using gte or lte in any gate use $expr
      } else {
        query = {
          is_deleted: 0,
        };
      }

      const result = await findWithPaginate(
        res,
        institute,
        query,
        project,
        pageNo,
        limitOfPage
      );

      if (result.status) {
        // university adding

        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          result.data
        );
      } else throw new Error(result.data);
    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };

  getHiringInstituteList = async (req, res) => {
    try {
      const { page, limit } = req.body;

      const pageNo = page || instituteMessage.PAGE;
      const limitOfPage = limit || instituteMessage.LIMIT;

      const query = {
        is_deleted: 0,
        batch: new Date().getFullYear().toString(),
      };

      const projection = {
        institute: 1,
        tpo_name: 1,
        tpo_phone_number: 1,
        students: "$studentCount",
        institute_id: "$_id",
        qualification: 1,
      };

      const result = await findWithPaginate(
        institute,
        query,
        project,
        pageNo,
        limitOfPage
      );

      if (result.status) {
        // university adding

        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          result.data
        );
      } else throw new Error(result.data);
    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };

  removeInstitute=async(req,res)=>{
     try {
      const institute_id=req.params._id;
      const query={
        _id:institute_id,
        is_deleted:0
      }
     

      const result=await deleteOne(institute,query);

      if(result.status){
        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DELETED,
          result.data
        );
      }
      else
      throw new Error(instituteMessage.DATA_NOT_FOUND);
      
     } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
     }


  }
}

export default instituteController;
