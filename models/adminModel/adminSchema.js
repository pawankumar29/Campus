import mongoose from "mongoose";
import bcrypt from "bcrypt"
const schema=mongoose.Schema;

const adminSchema=new schema({
 
    name:{type:String,required:true},
    institute:{type:schema.Types.ObjectId,ref:"institutes"},
    email:{type:String,required:true},
    password:{type:String,required:true},
    resetPasswordToken:{type:String,default:undefined},
    resetPasswordTokenExpire:{type:Date,default:undefined}

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



const fun=async()=>{

  const obj={
    name:"pawan",
    email:"pawan@yopmail.com",
    password:123,
    institute:"63fded8d59b7dc26ed18d5a2"
  }
    await admin.create(obj);

}







