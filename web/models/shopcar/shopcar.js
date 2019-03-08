import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopcarSchema = new Schema({
    shopcar_goods : { type : Array , default : [] } ,
    user_id : { type : String , required : true },
    all_price : { type : String , default : "0" } ,
    all_count : { type : Number , default : 0 } ,
    user_nick_name : String
} , { timestamps : true , id : false , versionKey : false });

const shopcarModel = mongoose.model("shopcar" , shopcarSchema );

export default shopcarModel;
