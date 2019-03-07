import HttpClient from "./http";

class BaiDuMap extends HttpClient {
    constructor(){
        super();
        this.apk = "oyzVfd15irfNCQ7qiLKoY3oMEaIaMw64";
        this.decryptApi = "http://api.map.baidu.com/geocoder/v2/";                          //逆地理编码api
        this.transformApi = "http://api.map.baidu.com/geoconv/v1/";                         //转换经纬度api
        this.searchByKeywordApi = "http://api.map.baidu.com/place/v2/suggestion";         //关键字搜索api
        this.positionByIpApi = "http://api.map.baidu.com/location/ip";

        this.decryptCode = this.decryptCode.bind( this );
        this.transformCode = this.transformCode.bind( this );
        this.searchByKeyword = this.searchByKeyword.bind( this );
    }
    /*
    *   百度API全球逆地理编码
    * */
    async decryptCode( y , x ){
        let url = `${this.decryptApi}?ak=${ this.apk }&output=json&location=${y},${x}`;
        let result = await this.getUrl( url );
        return result;
    }
    /*
    *   经纬度转百度经纬度，查询百度地图
    * */
    async transformCode( lon , lat ){
        let url = `${this.transformApi}?ak=${ this.apk }&coords=${lon},${lat}`;
        let result = await this.getUrl( url );
        return result;
    }
    /*
    *   通过关键字查询地址
    * */
    async searchByKeyword( word ){
        let currProvince = await this.positionByIp();
        let url = `${this.searchByKeywordApi}?query=${encodeURI( word )}&region=${encodeURI(currProvince.content.address_detail.province)}&city_limit=true&output=json&ak=${this.apk}`;


        let result = await this.getUrl( url );
        return result;
    }
    /*
    *   通过IP定位
    * */
    async positionByIp(){
        let url = `${this.positionByIpApi}?ak=${this.apk}`;
        let result = await this.getUrl( url );

        return result;
    }
}


export default BaiDuMap;