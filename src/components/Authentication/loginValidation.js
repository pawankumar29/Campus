
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

