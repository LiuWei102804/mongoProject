import express from "express";
import bodyParse from "body-parser";
import Cookies from "cookies";
import MD from "./src/db/mongodb";
import route from "./src/api/api";
import { addLocation } from "./src/db/location";

const app = express();

app.use( express.static("./src/images") );
app.use( bodyParse.json() );


/*
*   添加地址数据
* */

//addLocation();


app.use((req,res,next) => {
    next();
})

app.use("/api" , route );
app.listen(8999,() => {
    console.log("服务启动在http://localhost:8999")
})