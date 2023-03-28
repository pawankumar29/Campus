import express from "express";
const router=express.Router();
import passport from "passport";
import authentication from "./controller.js"
router.route("/login").post(passport.authenticate("local", { 

failureFlash: true }), authentication.login);

router.route("/forgot-password").post( authentication.forgot_password);
router.route("/reset-password").post( authentication.resetPassword); // creating new that is why post


export default router;