var log4js = require('log4js');
var path = require("path");
var format = require("../../public/common").format;


var currTime = format( Date.now() , "yyyyMMdd" );

log4js.configure({
    appenders: {
        stdout : { type : "stdout" } ,
        user: {
            type: "file",
            filename: `logs/info/${currTime}.log` ,
        }
    } ,
    categories: { default: { appenders: ["user","stdout"], level: "trace" } }
});

var logger = log4js.getLogger("app");

module.exports = logger;