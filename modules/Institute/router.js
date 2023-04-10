import express from "express";
import instituteController from "./controller.js";
const classObject=new instituteController();
const Router=express.Router();


Router.route("/addInstitute").post(classObject.addInstitute);

Router.route("/").get(classObject.getInstituteList);

export default Router;