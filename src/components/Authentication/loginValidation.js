
 export const emailValidation=(values,emailCounter)=>{
   
    const error={};
    if(emailCounter){
    if(!values.email){
        error.message="email is required"
    }
    else if(values.email.length<5){
        error.message="email must be more than 5 characters"
    }
}

    return error; // we are returning an object
}

export const passwordValidation=(values,passwordCounter)=>{
    let error={};
    if(passwordCounter>0){
        if(!values.password){
            error.password="password is required"
        }
    }

    return error;
}

export const loginResponseValidation=(values)=>{
 const error={};
     if(values.email==""){
       error.loginError="Invalid Email id/Password"
     }

     return error;

}

export const resetPasswordValidation=(values)=>{
       const error={};

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

