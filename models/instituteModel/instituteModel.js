
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