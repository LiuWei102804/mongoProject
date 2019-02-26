import fs from "fs";
import path from "path";
import multer from "multer";

var uploadFolder = "";
var storage = multer.diskStorage({
    destination : function ( req , file , cb ) {
        uploadFolder = "images/" + req.session.uid.account + "/";
        if( !fs.existsSync( uploadFolder ) ) {
            fs.mkdir( uploadFolder );
        }
        cb( null , uploadFolder )
    }
});
var upload = multer({ storage: storage });

export default upload;