
 export const validation=(values)=>{
   
    const error={};

    if(!values.email){
        error.message="name is required"
    }
     if(!values.password){
        error.password="password is required"
    }
    else if(values.email.length<5){
        error.message="email must be more than 5 characters"
    }
   

    return error; // we are returning an object



}

export const loginResponseValidation=(values)=>{
 const error={};
     if(!values.token){
       error.loginError="Invalid Email id/Password"
     }

     return error;

}

export const resetPasswordValidation=(values)=>{
       const error={};
       console.log("v-->",values);
    if(values.password==""||values.confirmPassword==""){
         error.resetError="all fields are required to fill"
    }

    return error;
}

export const forgotPasswordValidation=(email)=>{
    const error={};
 if(email===""){
      error.forgotError=" field is required to fill"
 }

 return error;
}

