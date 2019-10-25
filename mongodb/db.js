"use strict"

import mongoose from "mongoose";
import config from "config-lite";
import logger from "../web/util/log4jsUtil";


mongoose.connect( config.url , { useNewUrlParser: true } , ( err , res ) => {
    if( err ) {
        //console.log( err );
    }
});

const db = mongoose.connection;


db.once("open", () => {
    logger.info("mongooDB数据库连接成功.端口号：" + config.prot );          //自定义日志存储
});


db.on("error" , ( error ) => {
    logger.debug("mongooDB数据库连接错误." + error);
    mongoose.disconnect();
});


db.on("close" , () => {
    logger.trace('mongooDB数据库断开，请重新连接.');
    mongoose.connect( config.url , { server : { auto_reconnect : true }});
});


export default db;