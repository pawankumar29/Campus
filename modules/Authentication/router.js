import express from "express";
const router=express.Router();
import passport from "passport";
import authentication from "./controller.js"
router.route("/login").post(passport.authenticate("local", { 

failureFlash: true }), authentication.login);



export default router;