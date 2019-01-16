import express from "express";
import Request from "../request/result";
import Log from "../log/log";
import { format , transformTimeToSecond } from "../util/util";
import MD from "../db/mongodb";



const route = express.Router();
const log = new Log();

/*
*   desc : 获取省份信息
* */
route.get("/getLocation.json",( req , res , next ) => {
    let start = Date.now();
    let query = req.query;
    let where = {
        "level" : query.level || "1" ,
        "parentId" : query.parentId || "1"
    };
    MD.then(db => {
        db.db("location").collection("location").find( where ).toArray((err,result) => {
            const request = new Request();
            try{
                request.setResult( result );
                res.send( request );
            } catch ( e ) {
                request.setMsg("服务器错误");
                request.setCode(500);s
                request.setResult(null);
                res.send( request );
            }
            log.logInfo(`${format( Date.now() )}  查询地区信息， 接口'/getLocation.json', 参数level = ${where.level},parentId = ${where.parentId}, 接口执行时间${ transformTimeToSecond( Date.now() - start ) }s`);
        })
    });
});



export default route;
