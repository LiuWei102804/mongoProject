import express from "express";
import Request from "../request/result";
import redis from "redis";
import Log from "../log/log";
import MD from "../db/mongodb";
import { format } from "../util/util";
import route from "./api";


const location_route = express.Router();
const client = redis.createClient();
const log = new Log();


location_route.get("/userLocations.json",( req,res,next ) => {
    const request = new Request();
    let start = Date.now();
    let account = req.cookies.get("token");
    let where = { account : account };

    MD.then(db => {
        db.db("chicken").collection("user_location").find( where ).toArray((err,result) => {
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  查询地区信息， 接口'/userLocations.json', 参数account = ${account}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
        })
    });
});

/*
*   desc : 获取地址信息
* */
location_route.get("/getLocation.json",( req , res , next ) => {
    const request = new Request();
    let start = Date.now();
    let query = req.query;
    let where = {
        "level" : query.level || "1" ,
        "parentId" : query.parentId || "1"
    };
    MD.then(db => {
        db.db("chicken").collection("location").find( where ).toArray((err,result) => {
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  查询地区信息， 接口'/getLocation.json', 参数level = ${where.level},parentId = ${where.parentId}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
        })
    });
});


/*
*   新增地址信息
* */
location_route.post("/addUserLocation.json",(req,res,next) => {
    const request = new Request();
    let start = Date.now();
    let body = req.body;

    if( request.isEmpty( body.realName ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} realName 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.phone ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} phone 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.province ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} province 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.city ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} province 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }
    if( request.isEmpty( body.area ) ) {
        request.setCode( request.NO_PARAM_ERROR() );
        request.setMsg( `${request.NO_PARAM_MSG()} area 不能为空` );
        res.send( request );
        log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/addUserLocation.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
    }

    body.account = req.cookies.get("token");
    body.loca = body.province + body.city + body.area;
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
            log.logInfo(`${format( Date.now() )}  发布商品信息， 接口'/publish.json', 参数body = ${JSON.stringify(body)}, 接口执行时间${ Date.now() - start }ms, return ${JSON.stringify( request )}`);
        })
    });
});


export default location_route;


