import http from "http";
import Request from "../../prototype/request";

class Position {
    constructor(){
        this.baiduAPK = "oyzVfd15irfNCQ7qiLKoY3oMEaIaMw64";


        this.getLocation = this.getLocation.bind( this );
        this.baiduLocation = this.baiduLocation.bind( this );
    }
    /*
    *   通过经纬度查询位置
    * */
    async getLocation( req , res , next ){
        let request = new Request();
        let { lon , lat } = req.query;

        try{
            let location = await this.changeLocation( lon , lat );
            let address = await this.baiduLocation( location.result[0].x , location.result[0].y );


            request.setCode( 200 );
            request.setResult(address);
        } catch( e ) {
            console.log( e.message );
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   调百度逆地理编码
    * */
    baiduLocation( x,y ){
        let baiduAPI = `http://api.map.baidu.com/geocoder/v2/?ak=${ this.baiduAPK }&output=json&location=${x},${y}`;
        return new Promise(( resolve,reject ) => {
            http.get( baiduAPI , res => {
                let { statusCode } = res;
                switch ( statusCode ) {
                    case 200 :
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
        })
    }
    /*
    *   转百度经纬度
    * */
    changeLocation( lon , lat ){
        let baiduAPI = `http://api.map.baidu.com/geoconv/v1/?ak=${ this.baiduAPK }&coords=${lon},${lat}`;
        return new Promise(( resolve,reject ) => {
            http.get( baiduAPI , res => {
                let { statusCode } = res;
                switch ( statusCode ) {
                    case 200 :
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
        })
    }
}

export default new Position();