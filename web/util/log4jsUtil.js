var log4js = require('log4js');
var format = require("../../public/common").format;

log4js.loadAppender("file");


var currTime = format( Date.now() , "yyyyMMdd" );

log4js.addAppender(log4js.appenders.file("../../logs/" + currTime + ".log"),"user"); //根据日期保存日志信息

var logger = log4js.getLogger("user");


/**
 * 正常日志记录
 * @param message 日志内容
 */
exports.info = function(message){
    logger.info(message);
};

/**
 * 调试日志记录
 * @param message 日志内容
 */
exports.debug = function(message){
    logger.debug(message);
};

/**
 *
 * @param message 日志内容
 */
exports.trace = function(message){
    logger.trace(message);
};

/**
 * 告警日志记录
 * @param message 日志内容
 */
exports.warn = function(message){
    logger.warn(message);
};

/**
 * 错误日志记录
 * @param message 日志内容
 */
exports.error = function(message){
    logger.error(message);
};

/**
 *
 * @param message
 */
exports.fatal = function(message){
    logger.fatal(message);
};