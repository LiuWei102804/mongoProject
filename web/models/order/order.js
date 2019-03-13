import mongoose from "mongoose";
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    order_num : { type : String , require : true } ,
    user_id : { type : String , require : true } ,
    user_real_name : String ,
    user_avatar : String ,
    user_nick_name : String ,
    goods : { type : Array , default : [] } ,
    order_price : String ,
    state : { type : Number , default: 1 } ,                          // 1 未支付 2 已支付 3 已取消
    state_remark : { type : String , default : "未支付" } ,
    limit_time : { type : Number , default : Date.now() + 30 * 60000 }
} , { timestamps : true , id : false , versionKey : false });


const OrderModel = mongoose.model("order" , orderSchema);

export default OrderModel;