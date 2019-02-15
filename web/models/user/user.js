import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    account : String ,
    nick_name : { type : String , default : "" }  ,
    create_time : { type : Date , default: Date.now } ,
    avatar : { type : String , default : "default.jpg" } ,
    shopList : Array
});

userSchema.index({ id : 1 });
const Users = mongoose.model("user", userSchema );


export default Users;