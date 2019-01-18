import express from "express";
import bodyParse from "body-parser";
import Cookies from "cookies";
import MD from "./src/db/mongodb";
import route from "./src/api/api";
import localtion_route from "./src/api/location";
import Request from "./src/request/result";
import redis from "redis";
import { addLocation } from "./src/db/location";

const app = express();
const client = redis.createClient();

app.use( express.static("./src/images") );
app.use( bodyParse.json() );


/*
*   添加地址数据
* */
//addLocation();


app.use(( req , res , next ) => {
    req.cookies = new Cookies( req , res );
    if( !req.cookies.get("token")
        && req.path != "/api/login.json"
        && req.path != "/api/sendCode.json"
        && req.path != "/api/getLocation.json" ) {
        const request = new Request();
        request.setCode( request.NO_ALLOW_ERROR() );
        request.setMsg( request.NO_ALLOW_MSG() );
        res.send( request );
    } else {
        next();
    }
})

app.use("/api" , route );
app.use("/loca" , localtion_route );

app.listen(8999,() => {
    console.log("服务启动在http://localhost:8999")
});

