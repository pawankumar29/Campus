
class response{

    response(res,statusCode,message,data){
        return res.status(statusCode).json({"message":message,
        Data:data})
    }
}

export default new response();