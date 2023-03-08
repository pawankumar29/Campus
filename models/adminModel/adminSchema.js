import mongoose from "mongoose";
import bcrypt from "bcrypt"
const schema=mongoose.Schema;

const adminSchema=new schema({
 
    name:{type:String,required:true},
    institute:{type:schema.Types.ObjectId,ref:"institutes"},
    email:{type:String,required:true},
    password:{type:String,required:true},

},
 {timestamps:true}
)

adminSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next(); // Skip if password isn't modified
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  });

  // always call pre post before model creation

export const admin=mongoose.model("admin",adminSchema); // return constructor function


