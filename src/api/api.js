import express from "express";
import Request from "../request/result";
import https from "https";
import Log from "../log/log";
import WXBizDataCrypt from "../util/WXBizDataCrypt";
import { format , transformTimeToSecond } from "../util/util";
import MD from "../db/mongodb";


const route = express.Router();
const log = new Log();
const code2session = "https://api.weixin.qq.com/sns/jscode2session";
const appId = "wxde66ed9e6259db5b";
const secret = "e283678f7339a213555ad8acff712cb7";
const grant_type = "authorization_code";
let sessionKey = "";
let accessToken = null;


route.post("/login.json",(req,res,next) => {
    let start = Date.now();
    let body = req.body;

    https.get(`${code2session}?appid=${appId}&secret=${secret}&grant_type=${grant_type}&js_code=${body.code}` , res2 => {
        res2.on("data", ( d ) => {
            sessionKey = d.session_key;
            res.send( d );
        });
    }).on("error", e => {
        console.log("出错了 " , JSON.stringify( e ) )
    })
});


/*
*   desc : 获取地址信息
* */
route.get("/getLocation.json",( req , res , next ) => {
    let start = Date.now();
    let query = req.query;
    let where = {
        "level" : query.level || "1" ,
        "parentId" : query.parentId || "1"
    };
    MD.then(db => {
        db.db("chicken").collection("location").find( where ).toArray((err,result) => {
            const request = new Request();
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  查询地区信息， 接口'/getLocation.json', 参数level = ${where.level},parentId = ${where.parentId}, 接口执行时间${ Date.now() - start }ms`);
        })
    });
});

/*
*   新增地址信息
* */
route.post("/addUserLocation.json",(req,res,next) => {
    let start = Date.now();
    let body = req.body;
    const request = new Request();
    if( request.isEmpty( body.realName ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} realName 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }
    if( request.isEmpty( body.phone ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} phone 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }
    if( request.isEmpty( body.province ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} province 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }
    if( request.isEmpty( body.city ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} province 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }
    if( request.isEmpty( body.area ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} area 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }

    MD.then(db => {
        db.db("chicken").collection("user_location").insertOne( body ,(err,result) => {
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
        })
    });
});


/*
*   发布商品
* */
route.post("/publish.json",(req,res,next) => {
    let start = Date.now();
    let body = req.body;
    const request = new Request();
    if( request.isEmpty( body.name ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} name 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
    }
    if( request.isEmpty( body.price ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} price 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);

    }
    if( request.isEmpty( body.stock ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} stock 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);

    }
    if( request.isEmpty( body.locaId ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} locaId 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);

    }
    if( request.isEmptyArray( body.pics ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} pics 最少一条数据` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);

    }

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
            log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms`);
        })
    });
});



export default route;
