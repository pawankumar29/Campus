import express from "express";
import { upload } from "../../helpers/commonFunctions.js";
import instituteController from "./controller.js";
const classObject=new instituteController();
const Router=express.Router();



Router.route("/addInstitute").post(upload,classObject.addInstitute);

Router.route("/").get(classObject.getInstituteList);


export default Router;