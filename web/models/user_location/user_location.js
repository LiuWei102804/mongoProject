import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const UserLocationSchema = new Schema({
    user_id : String ,
    phone : String ,
    user_real_name : String ,
    province : String ,
    city : String ,
    area : String ,
    street : String ,
    label : Number ,            //1 家  2 公司  3 学校
    label_str : String
} , { timestamps : true , id : false , versionKey : false });

// UserLocationSchema.index({ id : 1 });
const UserLocation = mongoose.model("user_location", UserLocationSchema );

export default UserLocation;