import Request from "../../prototype/request";
import BaiDuMap from "../../prototype/baiduMapApi";
import dtime from "time-formater";
import log from "../../util/log4jsUtil";
import UserLocaltonSearchModel from "../../models/user_location_search/user_location_search";


class Position extends BaiDuMap {
    constructor(){
        super();

        this.getLocation = this.getLocation.bind( this );
        this.search = this.search.bind( this );
    }
    /*
    *   通过经纬度查询位置
    * */
    async getLocation( req , res , next ){
        let request = new Request();
        let { lon , lat } = req.query;

        try{
            let location = await this.transformCode( lon , lat );
            let address = await this.decryptCode( location.result[0].y , location.result[0].x );

            request.setCode( 200 );
            request.setResult( address.result );
        } catch( e ) {
            console.log( e.message );
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   百度地图关键字查询
    * */
    async search( req , res , next ){
         const request = new Request();
         let { word } = req.body;
         try{
            let result = await this.searchByKeyword( word );

            request.setResult( result );
         } catch ( e ) {
             console.log( e )
             log.error( e );
         } finally {
             res.send( request );
         }
    }
}

export default new Position();