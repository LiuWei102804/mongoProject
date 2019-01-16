import express from "express";
import bodyParse from "body-parser";
import Cookies from "cookies";
import MD from "./src/db/mongodb";
import fs from "fs";
import readline from "readline";
import route from "./src/api/api";
import { trimSpace } from "./src/util/util";
import { addLocation } from "./src/db/location";

const app = express();

app.use( express.static("./images") );
app.use( bodyParse.urlencoded({ extended : true }) );

/*
*   添加地址数据
* */
//addLocation();

// const rl = readline.createInterface({
//     input: fs.createReadStream("./src/db/loca.txt")
// });

// let writeStream = fs.createWriteStream("./src/db/local_data.js");
// const template = ["areaId","areaCode","areaName","level","cityCode","center","parentId"];
// rl.on("line", ( line ) => {
//     var o = Object.create(null);
//     let buf = Buffer.alloc(256);
//     buf.write( line ,"utf8");
//     var str = buf.toString("utf8");
//     var splitArr = str.split(", ");
//
//     splitArr[splitArr.length - 1] = trimSpace( splitArr[splitArr.length - 1] );
//
//     for( var i = 0; i < template.length; i ++ ) {
//         o[template[i]] = splitArr[i].replace(/^\s+/,"").replace(/\s+$/,"");
//     }
//     writeStream.write( JSON.stringify( o ) + ",\n","utf8");
// });
// // 处理流事件 --> data, end, and error
// writeStream.on("finish", function() {
//     rl.close();
//     writeStream.end();
// });

// fs.readFile("./src/db/loca.txt", ( err , data ) => {
//     if( err ) throw err;
//     console.log( data.toString() )
// })



// mongo.connect("mongodb://localhost:27017/").then( db => {
//     let dbo = db.db("runoob");
//     dbo.collection("runoob").find({}).toArray(( err , result ) => {
//         if( err ) throw err;
//         db.close();
//     })
// })


app.use("/api" , route );
app.listen(8999,() => {
    console.log("服务启动在http://localhost:8999")
})