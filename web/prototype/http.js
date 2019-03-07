import http from "http";

class HttpClient {
    constructor(){

    }
    /*
    *   封装get请求
    * */
    getUrl( url ){
        return new Promise(( resolve , reject ) => {
            http.get( url , res => {
                let { statusCode } = res;
                switch ( statusCode ) {
                    case 200 :
                        res.setEncoding('utf8');
                        let rawData = "";
                        res.on("data" , chunk => {
                            rawData += chunk;
                        });
                        res.on("end" , () => {
                            try {
                                const parsedData = JSON.parse( rawData );
                                resolve( parsedData );
                            } catch (e) {
                                reject(e.message);
                            }
                        });
                        break;
                    default :
                        reject("出错了,错误码" + statusCode );
                }
            });
        });
    }
}

export default HttpClient;