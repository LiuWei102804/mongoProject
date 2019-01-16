import { MongoClient } from "mongodb";

const MD = new Promise(( resolve , reject ) => {
                MongoClient.connect("mongodb://localhost:27017/" , ( err, db ) => {
                    if ( err ) reject( err );
                    resolve( db );
                });
            });
export default MD;