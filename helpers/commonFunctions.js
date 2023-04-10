import nodemailer from "nodemailer"
import fs from "fs";
import * as fast_csv from "fast-csv";
import { cwd } from "process";
import multer from "multer";

export const sendMail=async(emailToSend,token,name)=>{
       
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USERNAME, // replace with your own Gmail username
              pass: process.env.EMAIL_PASSWORD, // replace with your own Gmail password
            },
          });
       const frontend_url=process.env.frontend_url
          const message = {
            from: process.env.EMAIL_FROM, // replace with your own Gmail address
            to: emailToSend,
            subject: 'Reset your password',
            html: `
              <p>Hi ${name},</p>
              <p>You have requested pawan to reset your password.</p>
              <p>Click <a href="http://localhost:3000/reset?token=${token}" style="color:blue; text-decoration:underline">here</a> to reset your password.</p>
              <p>If you did not request this, please ignore this email.</p>
            `,
          };
          
          transporter.sendMail(message);

          return {status:1}
        
    } catch (error) {
        return {status:0,message:error.message}
    }


}


export const readCsvFile=(file)=>{
  
  try {
      const path=cwd()+"/"+file; // cwd for current directory
   const documentDataArray=[];
      const csvData=new Promise((resolve,reject)=>{
          
        const stream=fs.createReadStream(path); // it is needed to pass in the fromstream

        fast_csv.parseStream(stream,{headers:true}).on("data",(data)=>{
             documentDataArray.push(data);
        }).on("end",()=>{
          resolve(documentDataArray)
        })


      })

      return csvData;
  } catch (error) {
    return {status:0,message:error.message}
  }



}


 export const upload=multer({
     storage:multer.diskStorage({
      destination:function(req,file,cb){ // where you want to keep the data
          cb(null,"public/studentUploads");
     },
     filename:function(req,file,cb){
       cb(null,file.fieldname+"-"+Date.now()+".txt");
     }
  } )
 }).single("studentFile"); // parameter on which you want to pick up the file 


 export const findOne=async(model,query)=>{
  try {
      const result=await model.findOne(query);

      if(result){
          return {status:1,data:result}
      }
      else
      throw new Error(null)
      
  } catch (error) {
      return {status:0,data:null}
  }

}

export const findWithPaginate=async(model,query,projection,page,limit)=>{
 
  try {

      const data=await model.find(query,projection).skip((page-1)*limit).limit(limit);

      if(data){
          return {status:1,data:data}
      }
      else
      throw new Error(null)
      
  } catch (error) {
      return {status:0,data:error.message};
  }



}

export function validateEmail(email) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase()); //  test is a method that we use to compare the string with the pattern in regex
}

export const validateName = (name) => {
  let regex = /^[a-zA-Z]+(?:[.\s]*[a-zA-Z]+)*$/;
  return regex.test(name);
};



 // multer shortcut 
//  multer({
//     storage:{
//       destination:function(req,file,cb),
//       filename:function

//     }

 
//  })