
class response{

    response(res,statusCode,status,message,data){
        return res.status(statusCode).json({"status":status,"message":message,
        Data:data})
    }
}

export default new response();