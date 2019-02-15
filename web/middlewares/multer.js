import fs from "fs";
import path from "path";
import multer from "multer";

var uploadFolder = "";
var storage = multer.diskStorage({
    destination : function ( req , file , cb ) {
        uploadFolder = "src/images/" + req.session.token + "/";
        if( !fs.existsSync( uploadFolder ) ) {
            fs.mkdir( uploadFolder );
        }
        cb( null , uploadFolder )
    }
});
var upload = multer({ storage: storage });

export default upload;