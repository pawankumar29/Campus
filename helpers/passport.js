import passport from "passport";
import { admin } from "../models/adminModel/adminSchema.js";
import LocalStrategy from 'passport-local';
import  bcrypt  from 'bcrypt'

export function initialize(passport) {
  // const authenticateUser = async (email, password, done) => {
  //   const user = await admin.findOne({email:email});
  //   if (user == null) {
  //     return done(null,  { message: 'No user with that email' })
  //   }

  //   try {
  //      const password1=await bcrypt.compare(password,user.password);
  //     if (password1) {
  //       return done(null, user._id);
  //     } else {
  //       return done(null, false, { message: 'Password incorrect' })
  //     }
  //   } catch (e) {
  //     return done(e)
  //   }
  // }


  const authenticateUser=async (email, password, done) => {
    console.log("Authenticating user...");
    const user = await admin.findOne({email:email});
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    
    try {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        console.log("incorrect Password");
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (e) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email',passwordField:"password" }, authenticateUser))
  passport.serializeUser((user, done) =>{

   done(null, user) })
  passport.deserializeUser(async(id, done) => {
    const user=await admin.findById(id)
    console.log("b--->",user);
    return done(null, user)
  })
}

