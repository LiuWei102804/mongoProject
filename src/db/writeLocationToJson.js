import fs from "fs";
import readline from "readline";
import { trimSpace } from "../util/util";


const fRead = fs.createReadStream("./loca.txt");
const fWrite = fs.createWriteStream("./local_data.js");
let enableWrite = false;


const rl = readline.createInterface({
    input: fRead ,
    output : fWrite
});
fRead.on("end",function () {
    //console.log("end")
    enableWrite = true;
    fWrite.write( "];\n" );
});

const template = ["areaId","areaCode","areaName","level","cityCode","center","parentId"];
fWrite.write(`export const locaData = [\n`,"utf8");
rl.on("line", ( line ) => {
    if( !enableWrite ) {
        var o = Object.create(null);
        let buf = Buffer.alloc(256);
        buf.write( line ,"utf8");
        var str = buf.toString("utf8");
        var splitArr = str.split(", ");
        splitArr[splitArr.length - 1] = splitArr[splitArr.length - 1].replace(/[^\d+]/g,"");


        for( var i = 0; i < template.length; i ++ ) {
            o[template[i]] = splitArr[i].replace(/^\s+/,"").replace(/\s+$/,"");
        }
        fWrite.write( JSON.stringify( o ) + ",\n","utf8");
    }
});

