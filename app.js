import express from "express";
import db from "./mongodb/db";
//import redisClient from "./redis/redis";
import bodyParse from "body-parser";
import config from "config-lite";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import winston from "winston";
import expressWinston from "express-winston";
import path from "path";
import router from "./routes/index";
import { format } from "./public/common";


const app = express();
app.all("*",(req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin );
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With");
    res.header("Content-Type","application/json");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true);                                            //可以带Cookies
    res.header("X-Powered-By","3.2.1");
    if(req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});

const MongoStore = connectMongo( session );
app.use(cookieParser());                    //cookie运用
app.use( bodyParse.json() );                //解析post请求
app.use( express.static("/src/images/*") );

//session运用
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({url: config.url})
}));

//正确日志
app.use(expressWinston.logger({
    transports: [
        new ( winston.transports.Console )({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/' + format( Date.now(),"yyyyMMdd" ) + '-success.log' ////根据日期生成日志成功文件
        })
    ] ,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}));
//错误日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console ({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/' + format( Date.now(),"yyyyMMdd" ) + '-error.log' //根据日前生成日志错误文件
        })
    ]
}));


router( app );


app.listen(config.prot);

// import express from "express";
// import bodyParse from "body-parser";
// import Cookies from "cookies";
// import MD from "./src/db/mongodb";
// import route from "./src/api/api";
// import localtion_route from "./src/api/location";
// import Request from "./src/request/result";
// import redis from "redis";
// import { addLocation } from "./src/db/location";
//
// const app = express();
// const client = redis.createClient();
//
// app.use( express.static("./src/images") );
// app.use( bodyParse.json() );
//
//
// /*
// *   添加地址数据
// * */
// //addLocation();
//
//
// app.use(( req , res , next ) => {
//     req.cookies = new Cookies( req , res );
//     if( !req.cookies.get("token")
//         && req.path != "/api/login.json"
//         && req.path != "/api/sendCode.json"
//         && req.path != "/api/getLocation.json"
//         && req.path != "/api/isLogin.json") {
//         const request = new Request();
//         request.setCode( request.NO_ALLOW_ERROR() );
//         request.setMsg( request.NO_ALLOW_MSG() );
//         res.send( request );
//     } else {
//         next();
//     }
// })
//
// app.use("/api" , route );
// app.use("/loca" , localtion_route );
//
// app.listen(8999,() => {
//     console.log("服务启动在http://localhost:8999")
// });
//
