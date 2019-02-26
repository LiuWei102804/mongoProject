"use strict"


module.exports = {
    redisHost : "127.0.0.1" ,
    redisProt : 6379 ,
    prot : 8999 ,
    url:"mongodb://127.0.0.1:27017/checken",
    session : {
        name : "SID" ,
        secret : "SID" ,
        cookie : {
            httpOnly: true,
            secure:   false,
            maxAge:   24 * 60 * 60 * 1000,
        }
    }
}
