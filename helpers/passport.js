import passport from "passport";
import { admin } from "../models/adminModel/adminSchema.js";
import LocalStrategy from 'passport-local';
import  bcrypt  from 'bcrypt'

export function initialize(passport) {
  const authenticateUser=async (email, password, done) => {

    const user = await admin.findOne({email:email});
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    
    try {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
       
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

