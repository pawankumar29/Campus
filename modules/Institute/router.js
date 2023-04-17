import express from "express";
import { upload } from "../../helpers/commonFunctions.js";
import instituteController from "./controller.js";
const classObject=new instituteController();
const Router=express.Router();



Router.route("/addInstitute").post(upload,classObject.addInstitute);

Router.route("/all_Institutes").get(classObject.getInstituteList);
Router.route("/hiringInstitutes").get(classObject.getHiringInstituteList);
Router.route("/deleteInstitute/:_id").delete(classObject.removeInstitute);


export default Router;