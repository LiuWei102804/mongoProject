import mongoose from 'mongoose';
import dtime from "time-formater";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    account : String ,
    nick_name : { type : String , default : "" }  ,
    avatar : { type : String , default : "default.jpg" } ,
    gender : { type : Number , default : 1 } ,                      //1 男  0 女
    gender_remark : { type : String , default : "男" } ,
    real_name : { type : String , default : "" }
    //timestamps: { createdAt: "create_time", updatedAt: "update_time" }

},{ timestamps : true , id : false , versionKey : false });

// userSchema.index({ id : 1 });
const Users = mongoose.model("user", userSchema );


export default Users;