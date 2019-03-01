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
import connectRedis from "connect-redis";
import router from "./routes/index";
import dtime from "time-formater";


const app = express();
const RedisStore = connectRedis( session );


app.all("*",(req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*" );
    res.header("Access-Control-Allow-Headers", "Authorization, X-Requested-With");
    //res.header("Content-Type", req.headers["content-type"] );
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true);                                            //可以带Cookies
    res.header("X-Powered-By","3.2.1");
    if(req.method == "OPTIONS") {
        res.send(200);
    } else {
        next();
    }
});

//const MongoStore = connectMongo( session );
app.use( express.static("images") );      //静态托管
app.use( cookieParser() );                    //cookie运用
app.use( bodyParse.json() );                //解析post请求


//session运用
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new RedisStore({
        host : config.redisHost ,
        port: config.redisProt
    })
}));

//正确日志
app.use(expressWinston.logger({
    transports: [
        // new ( winston.transports.Console )({
        //     json: true,
        //     colorize: true
        // }),
        new winston.transports.File({
            filename: 'logs/success/' + dtime( Date.now() ).format("YYYYMMDD") + '.log'   //根据日期生成日志成功文件
        })
    ]
}));
router( app );
//错误日志
app.use(expressWinston.errorLogger({
    transports: [
        new ( winston.transports.Console ) ({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error/' + dtime( Date.now() ).format("YYYYMMDD") + '.log'     //根据日期生成日志错误文件
        })
    ]
}));





app.listen(config.prot);


