import moment from "moment";
import { studentMessage } from "../../core/constant/studentMessages.js";
import { validateEmail, validateName } from "../../helpers/commonFunctions.js";

export const validateStudentData=(studentDataArray)=>{
   
    try {

        const error=[];
        const emailArray=[];
        
        studentDataArray.forEach(obj => {
            
           if(emailArray.includes(obj.email)){
              error.push({message:studentMessage.DUPLICATE_EMAIL})
           }

           if (
            !obj["email"] ||
            !obj["name"] ||
            !obj["qualification"] ||
            !obj["roll_no"] ||
            !obj["phone_no"] ||
            !obj["dob"]
          ) {
            error.push({ message: studentMessage.MISSING_FIELD,data:obj});
          }    
          if (obj["name"] && !validateName(obj["name"])) {
            error.push({ message: studentMessage.INVALID_NAME, data: obj });
          }   
          if (obj["email"] && !validateEmail(obj["email"])) {
            error.push({ message: studentMessage.INVALID_EMAIL, data: obj });
          }
          if (
            obj["dob"] &&
            !moment(obj["dob"], studentMessage.DATE_FORMAT, true).isValid()
          ) {
            error.push({ message: studentMessage.INVALID_DATE, data: obj });
          }
        
    

        });

        if(error.length){
            return {status:0,Error:error}
        }
        else{
            return {status:1,data:studentDataArray}
        }
         

    } catch (error) {
        return {status:0,Error:error}
    }




}