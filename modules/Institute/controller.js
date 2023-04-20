import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import instituteMessage from "../../core/constant/instituteMessage.js";
import {
  deleteOne,
  find,
  findOne,
  findWithPaginate,
  readCsvFile,
} from "../../helpers/commonFunctions.js";
import { status } from "../../helpers/commonVariables.js";
import { findTpoWithPaginate } from "../../models/instituteModel/instituteModel.js";
import { institute } from "../../models/instituteModel/instituteSchema.js";
import { tpo } from "../../models/instituteModel/tpoSchema.js";
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

        if (!checkInstituteExistAlready.status) {
          let file_path;
          if (req.file.path) file_path = req.file.path;
            
          const dataFromFile = await readCsvFile(file_path);
          data.studentCount = dataFromFile.length;
   
          const instituteData = await institute.create(data);

          const tpoData = {
            tpo_email: tpo_email,
            institute: instituteData._id,
            tpo_phone_number: tpo_phone_number,
            batch: instituteData.batch,
            tpo_name: tpo_name,
            institute_id: instituteData._id,
          };

          const r1 = await tpo.create(tpoData);

          if (dataFromFile.length) {
            const validatedStudentData = validateStudentData(dataFromFile);
            if (validatedStudentData.status)
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
      let checkstatus = 0;

      const project = {
        institute: 1,
        qualification: 1,
        university: "$university_data.name",
        institute_id: "$_id",
        _id: 0,
      };
      const dateSortProject = {
        institute: 1,
        qualification: 1,
        university: 1,
        institute_id: "$_id",
      };

      if (Search && Search != "") {
        query = {
          is_deleted: 0,
          $or: [
            { institute: { $regex: Search, $options: "i" } },
            {
              qualification: { $elemMatch: { $regex: Search, $options: "i" } },
            },

            { batch: isNaN(Number(Search)) ? null : Number(Search) }, // checking if a number
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
        checkstatus = 1;
        query = {
          // time handled
          is_deleted: 0,

          $expr: {
            $and: [
              {
                $gte: ["$created_at", isoDate1],
              },
              {
                $lte: ["$created_at", isoDate2],
              },
            ],
          },
        }; // here if we are using gte or lte in any gate use $expr
      } else {
        query = {
          is_deleted: 0,
        };
      }

      if (checkstatus) {
        let dateData = await institute
          .find(query, dateSortProject)
          .populate("university", "name");
        dateData = JSON.parse(JSON.stringify(dateData));
        dateData.forEach((d) => {
          d.university = d.university.name;
        });

        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          dateData
        );
      } else {
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

  getHiringInstituteList = async (req, res) => {
    try {
      const { page, limit, startDate, endDate, searchBy } = req.query;

      const pageNo = page || instituteMessage.PAGE;
      const limitOfPage = limit || instituteMessage.LIMIT;
      const Search = searchBy || "";
      const StartDate = startDate || "";
      const EndDate = endDate || "";

      let checkstatus = 0;
      let query;

      const project = {
        institute: 1,
        tpo_name: 1,
        tpo_phone_number: 1,
        students: "$studentCount",
        institute_id: "$_id",
        qualification: 1,
      };

      if (Search && Search != "") {
        query = {
          is_deleted: 0,
          $or: [
            { institute: { $regex: Search, $options: "i" } },
            {
              qualification: { $elemMatch: { $regex: Search, $options: "i" } },
            },

            { tpo_name: { $regex: Search, $options: "i" } },
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
        checkstatus = 1;
        query = {
          // time handled
          is_deleted: 0,

          $expr: {
            $and: [
              {
                $gte: ["$created_at", isoDate1],
              },
              {
                $lte: ["$created_at", isoDate2],
              },
            ],
          },
        }; // here if we are using gte or lte in any gate use $expr
      } else {
        query = {
          is_deleted: 0,
        };
      }

      query.batch = new Date().getFullYear();

      if (checkstatus) {
        let dateData = await institute
          .find(query, project)
          .populate("university", "name");
        dateData = JSON.parse(JSON.stringify(dateData));
        dateData.forEach((d) => {
          d.university = d.university.name;
        });

        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          dateData
        );
      } else {
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

  removeInstitute = async (req, res) => {
    try {
      const institute_id = req.params._id;
      const query = {
        _id: institute_id,
        is_deleted: 0,
      };

      const result = await deleteOne(institute, query);

      if (result.status) {
        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DELETED,
          result.data
        );
      } else throw new Error(instituteMessage.DATA_NOT_FOUND);
    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };

  viewInstitute = async (req, res) => {
    try {
      const instituteId = req.params.institute_id;

      const projection = {
        tpo_name: 1,
        tpo_email: 1,
        tpo_phone_number: 1,
        batch: 1,
        institute_data: 1,
        _id: 0,
      };

      const query = {
        institute_id: new mongoose.Types.ObjectId(instituteId),
      };

      const result = await findTpoWithPaginate(tpo, query, projection, 1, 10);
      result.data = JSON.parse(JSON.stringify(result.data));
      if (result.data) {
        result.data.forEach((d) => {
          d.qualification = d.institute_data.qualification;
          d.student_count = d.institute_data.studentCount;
          d.batch = `${d.batch - 1}-${d.batch}`;
          delete d.institute_data;
        });
      }

      if (result.status) {
        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          result.data
        );
      } else throw new Error(instituteMessage.DATA_NOT_FOUND);
    } catch (error) {
      response.response(
        res,
        StatusCodes.BAD_REQUEST,
        status.fail,
        error.message
      );
    }
  };

  uploadStudentFile = async (req, res) => {
    try {
      const institute_id = req.params.institute_id;
     
      const query={
        is_deleted:0,
        _id:institute_id
      }
   

      const institute_data = await institute.findOne(query)
      // institute_data=JSON.parse(JSON.stringify(institute_data));

      if (institute_data) {
        const Qualification = req.body.qualification;

        // checking qualification and inserting

        const query = {
          is_deleted: 0,
          _id: institute_id,
          qualification: { $in: Qualification},
        };
  
        const result = await  findOne(institute, query);

        if (result.status) {
          res.send("not added");
        } else {
          const secondResult = await institute.updateOne(
            { _id: institute_id },
            { $push: { qualification: Qualification } },
            { new: true }
          );
          res.send(secondResult);
        }
      }
      else{
        throw new Error("not exist institute");
      }
    } catch (error) {
      res.send(error);
    }
  };

  getEditInstitute = async (req, res) => {
    try {
      const institute_id = req.params.institute_id;

      const query = {
        is_deleted: 0,
        _id: institute_id,
      };
      const projection = {
        university: 1,
        institute: 1,
        tpo_name: 1,
        tpo_email: 1,
        tpo_phone_number: 1,
        qualification: 1,
      };

      let result = await institute
        .find(query, projection)
        .populate("university", "name");
      if (result.length) {
        result = JSON.parse(JSON.stringify(result));

        result.forEach((d) => {
          d.university = d.university.name;
        });
        response.response(
          res,
          StatusCodes.OK,
          status.success,
          instituteMessage.DATA_FOUND,
          result
        );
      } else throw new Error(instituteMessage.DATA_NOT_FOUND);
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
