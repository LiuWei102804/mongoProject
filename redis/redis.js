import redis from "redis";
import config from "config-lite";
import log from "../web/util/log4jsUtil";


const client = redis.createClient();

client.on("ready",function(err){
    if( err ){
        console.error(` redis error  ${ err }`);
    }else{
        log.info("redis连接成功， 端口号:6379");
    }
})

client.on("error", function (err) {
    console.error(` redis error  ${ err }`);
});


export default client;