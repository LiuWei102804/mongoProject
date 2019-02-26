import redis from "redis";
import config from "config-lite";


const client = redis.createClient();

client.on("ready",function(err){
    if( err ){
        console.error(` redis error  ${ err }`);
    }else{
        console.log(` redis ready `);
    }
})

client.on("error", function (err) {
    console.error(` redis error  ${ err }`);
});


export default client;