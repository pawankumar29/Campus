
const validation=(values)=>{
   
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

export default validation;