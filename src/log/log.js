import fs from "fs";


export default class Log{
    constructor(){
        this.logPath = "./src/log/log.txt";
    }
    logInfo( info ){
        fs.open( this.logPath ,"a", (err, fd) => {
            try{
                fs.appendFile( fd , info + ";\n" ,( err2 ) => {
                    if( err2 ) throw err2;
                    fs.close( fd );
                });
            } catch ( e ) {
                console.log( e );
            }
        });
    }
}