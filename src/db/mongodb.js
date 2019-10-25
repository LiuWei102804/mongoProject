import { MongoClient } from "mongodb";
import config from "config-lite";

const MD = new Promise(( resolve , reject ) => {
                MongoClient.connect( config.url , ( err, db ) => {
                    if ( err ) reject( err );
                    resolve( db );
                });
            });
export default MD;