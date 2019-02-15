"use strict"


module.exports = {
    prot : 8999 ,
    url:"mongodb://127.0.0.1:27017/checken",
    session : {
        name : "token" ,
        secret : "token" ,
        cookie : {
            httpOnly: true,
            secure:   false,
            maxAge:   24 * 60 * 60 * 1000,
        }
    }
}
