import Request from "../../prototype/request";
import Cities from "../../models/v1/city";


class CityHandle {
    constructor(){
        this.getCity = this.getCity.bind(this);
    }
    //获取城市
    async getCity(req, res, next) {
        const request = new Request();
        try{
            const level = req.query.level;
            const parentId = req.query.parentId;
            let cityInfo;

            cityInfo = await Cities.cityGroup({level:level,parentId:parentId});
            request.setCode( 200 );
            request.setMsg("成功");
            request.setResult( cityInfo );
            res.send( request );
        } catch( e ) {
            res.send({
                name: 'ERROR_DATA',
                message: '获取数据失败'
            })
        }
    }
}

export default new CityHandle();