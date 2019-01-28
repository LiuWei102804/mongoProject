import express from "express";
import Request from "../request/result";
import https from "https";
import Log from "../log/log";
import Pattern from "../util/pattern";
import { format , randomNumber } from "../util/util";
import redis from "redis";
import UUID from "uuid";
import MD from "../db/mongodb";



const route = express.Router();
const log = new Log();
const pattern = new Pattern();
const client = redis.createClient();


client.on("error", function (err) {
    console.log("Error " + err);
});

// const code2session = "https://api.weixin.qq.com/sns/jscode2session";
// const appId = "wxde66ed9e6259db5b";
// const secret = "e283678f7339a213555ad8acff712cb7";
// const grant_type = "authorization_code";
// let sessionKey = "";
// let accessToken = null;


/*
*   注册登录
* */
route.post("/login.json",( req , res, next ) => {
    const request = new Request();
    let start = Date.now();
    let body = req.body;
    let code = "";
    if( !pattern.isPhone( body.account ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} account 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/login.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.code + "" ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} code 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/login.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    client.get( `${body.account}_code` , ( err, str ) => {
        if( err ) {
            log.logError( err );
            request.setCode( 500 );
            request.setMsg( "查询token错误" );
            res.send( request );
        }
        //有验证码
        if( Boolean( str ) ) {
            let json = JSON.parse( str );
            if( body.code != json.randomNumber ) {
                request.setCode( request.PARAM_ERROR() );
                request.setMsg( request.PARAM_ERROR_MSG() );
                res.send( request );
            }

            MD.then(db => {
                db.db("chicken").collection("users").find({ "account" :body.account }).toArray((err2,res2) => {
                    if( err2 ) {
                        request.setMsg("查询错误");
                        request.setCode(500);
                        request.setResult(null);
                        res.send( request );
                    }
                    if( res2.length > 0 ) {

                        let v1 = UUID.v1();
                        request.setCode(200);
                        request.setMsg("成功");
                        request.setResult( body.account );
                        req.cookies.set("account" , body.account ,{
                            expires : new Date( Date.now() + 86400000 )
                        });
                        client.set( body.account , JSON.stringify( { token : v1 } ) );
                        client.expire( body.account , 86400 );
                        res.send( request );
                    } else {

                        MD.then(db => {
                            db.db("chicken").collection("users").insertOne({ account : body.account } , (err,result) => {
                                try{
                                    let v1 = UUID.v1();
                                    request.setCode(200);
                                    request.setMsg("成功");
                                    result.setResult( body.account );
                                    req.cookies.set("account" , body.account ,{
                                        expires : new Date( Date.now() + 86400000  )
                                    });
                                    client.set( body.account , JSON.stringify( { token : v1 } ) );
                                    client.expire( body.account , 86400 );
                                    res.send( request );
                                } catch ( e ) {
                                    request.setMsg("服务器错误");
                                    request.setCode(500);
                                    res.send( request );
                                }
                                log.logInfo(`${format( Date.now() )}  注册登录， 接口'/login.json', 参数level = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
                            })
                        });
                    }
                })
            })
        //无验证码
        } else {
            request.setCode(412);
            request.setMsg("验证码不正确");
            res.send( request );
        }
    })
});


/*
*   模拟发送验证码
* */
route.post("/sendCode.json",(req,res,next) => {
    const request = new Request();
    let start = Date.now();
    let body = req.body;

    if( request.isEmpty( body.account ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} account 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/sendCode.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( !pattern.isPhone( body.account ) ) {
        request.setCode( request.PARAM_ERROR() );
        request.setMsg( `${request.PARAM_ERROR_MSG()} account 不是手机号格式` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/sendCode.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }

    let random = randomNumber();
    client.set( `${body.account}_code` ,JSON.stringify( { randomNumber : random } ), err => {
        if( err ) {
            log.logError( err )
        };
    });
    client.expire( `${body.account}_code`, 300 );

    request.setResult( random );
    res.send( request );
    log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/sendCode.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
});

/*
*   查询登录状态
* */
route.get("/isLogin.json",(req,res,next) => {
    const request = new Request();
    let start = Date.now();
    let query = req.query;

    client.get( req.cookies.get("token") ,( err , str ) => {
        if( Boolean( str ) ) {
            request.setCode( 200 );
            request.setMsg("已登录");
            request.setResult( true );
        } else {
            request.setCode( 400 );
            request.setMsg("未登录");
            request.setResult( false );
        }
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发送验证码， 接口'/isLogin.json', account = ${query.account}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    })
});



/*
*   发布商品
* */
route.post("/publish.json",(req,res,next) => {
    const request = new Request();
    let start = Date.now();
    let body = req.body;
    if( request.isEmpty( body.name ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} name 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.price ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} price 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);

    }
    if( request.isEmpty( body.stock ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} stock 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);

    }
    if( request.isEmpty( body.locaId ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} locaId 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);

    }
    if( request.isEmptyArray( body.pics ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} pics 最少一条数据` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);

    }

    body.account = req.cookies.get("token");
    MD.then(db => {
        db.db("chicken").collection("goods").insertOne( body ,(err,result) => {
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
        })
    });
});



export default route;
