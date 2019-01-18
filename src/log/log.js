import fs from "fs";


export default class Log{
    constructor(){
        this.logPath = "./src/log/info_log.txt";
        this.errLogPath = "./src/log/err_log.txt";
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
    logError( err ){
        fs.open( this.errLogPath ,"a", (err, fd) => {
            try{
                fs.appendFile( fd , err + ";\n" ,( err2 ) => {
                    if( err2 ) throw err2;
                    fs.close( fd );
                });
            } catch ( e ) {
                console.log( e );
            }
        });
    }
}