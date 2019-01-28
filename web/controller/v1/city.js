import Cities from "../../models/v1/city";


class CityHandle {
    constructor(){
        this.getCity = this.getCity.bind(this);
    }
    //获取城市
    async getCity(req, res, next) {
        const type = req.query.level;
        const parentId = req.query.parentId;
        let cityInfo;

        cityInfo = await Cities.cityGroup();
        res.send(cityInfo);
        // try{
        //     switch( type ) {
        //         case "guess":
        //             const city = await this.getCityName(req);
        //             cityInfo = await Cities.cityGuess(city);
        //             break;
        //         case "hot":
        //             cityInfo = await Cities.cityHot();
        //             break;
        //         case "group":
        //             cityInfo = await Cities.cityGroup();
        //             break;
        //         default:
        //             res.send({
        //                 name:'ERROR_QUERY_TYPE',
        //                 message:'参数错误'
        //             });
        //             return;
        //     }
        //     res.send(cityInfo);
        // } catch(err) {
        //     res.send({
        //         name: 'ERROR_DATA',
        //         message: '获取数据失败'
        //     })
        // }
    }
}

export default new CityHandle();