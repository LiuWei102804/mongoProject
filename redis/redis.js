import redis from "redis";
import config from "config-lite";
import logger from "../web/util/log4jsUtil";



const client = redis.createClient();


client.on("ready",function(err){
    if( err ){
        console.error(`redis error  ${ err }`);
    }else{
        logger.info("redis连接成功， 端口号:6379");
    }
})


client.on("error", function (err) {
    console.log("error =============  " ,  log );
    logger.error(`redis error  ${ err }`);
});


export default client;