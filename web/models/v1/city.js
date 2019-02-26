import mongoose from "mongoose";
import cityData from "../../../initData/cities";
import city from "../../controller/v1/city";

const citySchema = new mongoose.Schema({
    areaId : Number ,
    areaCode : String ,
    areaName : String ,
    level : String ,
    cityCode : String ,
    center : String ,
    parentId : Number
},{ id : false , versionKey : false , timestamps : true });

//获取所有城市
citySchema.statics.cityGroup = function({ level = 1 , parentId = 1 }) {
    return new Promise(async (resolve,reject) => {
        try{
            const city = await this.find({ level : level , parentId : parentId });
            const cityObj = city;

            resolve( cityObj );
        } catch( err ) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败'
            });
            //console.error(err);
        }
    });
};

const Cities = mongoose.model( "Cities",citySchema );

Cities.findOne((err, data) => {
    if( err ) {
        console.error( err );
    }
    if( !data ) {
        Cities.create( cityData );
    }
});

export default Cities;