import mongoose from "mongoose";
import cityData from "../../../initData/cities";

const citySchema = new mongoose.Schema({
    data:{}
});

//获取所有城市
citySchema.statics.cityGroup = function() {
    return new Promise(async (resolve,reject) => {
        try{
            const city = await this.findOne();
            const cityObj = city.data;
            delete( cityObj._id );
            resolve( cityObj );
        } catch( err ) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败'
            });
            console.error(err);
        }
    });
};

const Cities = mongoose.model( "Cities",citySchema );

Cities.findOne((err, data) => {
    if( !data ) {
        Cities.create({data: cityData});
    }
});

export default Cities;