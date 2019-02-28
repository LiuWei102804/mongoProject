import http from "http";
import express from "express";
import Request from "../../prototype/request";
import dtime from "time-formater";
import log from "../../util/log4jsUtil";
import UserLocaltonSearchModel from "../../models/user_location_search/user_location_search";



const app = express();
class Position {
    constructor(){
        this.baiduAPK = "oyzVfd15irfNCQ7qiLKoY3oMEaIaMw64";


        this.getLocation = this.getLocation.bind( this );
        this.baiduLocation = this.baiduLocation.bind( this );
        this.queryByKeyword = this.queryByKeyword.bind( this );
        this.query = this.query.bind( this );
    }
    /*
    *   通过经纬度查询位置
    * */
    async getLocation( req , res , next ){
        let request = new Request();
        let { lon , lat } = req.query;

        try{
            let location = await this.changeLocation( lon , lat );
            let address = await this.baiduLocation( location.result[0].y , location.result[0].x );


            request.setCode( 200 );
            request.setResult(address.result);
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
    baiduLocation( y,x ){
        let baiduAPI = `http://api.map.baidu.com/geocoder/v2/?ak=${ this.baiduAPK }&output=json&location=${y},${x}`;
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
    /*
    *   百度地图关键字查询
    * */
    async queryByKeyword( req , res , next ){
         const request = new Request();




         try{
            let result = await this.query();
            request.setResult( result );
         } catch (e) {
             log.error( e.message );
         } finally {
             res.send( request );
         }


        // let { _id } = req.session.uid;
        // let { word } = req.body;
        //
        // try{
        //     let result = await UserLocaltonSearchModel.findOne({ user_id : _id });
        //     let keywords;
        //     let data = { create_time : dtime( Date.now() ).format("YYYY-MM-DD HH:mm:ss") , word : word };
        //     if( !result ) {
        //         keywords = [ data ];
        //         result = await UserLocaltonSearchModel.create({ keywords : keywords , user_id : _id });
        //     } else {
        //         keywords = result.keywords;
        //         keywords.push( data );
        //         if( keywords.length > 10 ) {
        //             keywords.length = 10;
        //         };
        //         await UserLocaltonSearchModel.findOneAndUpdate({ user_id : _id },{ keywords : keywords });
        //     }
        //     request.setCode( 200 );
        //     request.setMsg( "成功" );
        // } catch ( e ) {
        //     log.error( e.message );
        // } finally {
        //     res.send( request );
        // }
    }
    /*
    *   调百度API
    * */
    query(){
        return new Promise((resolve , reject) => {
            http.get("http://api.map.baidu.com/place/v2/suggestion?query=%E4%B8%AD%E8%88%AA%E5%A4%A9&region=%E4%B8%8A%E6%B5%B7&city_limit=true&output=json&ak=oyzVfd15irfNCQ7qiLKoY3oMEaIaMw64" , res => {
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
        })
    }
}

export default new Position();