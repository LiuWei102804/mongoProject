import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const UserLocaltonSearchSchema = new Schema({
    user_id : String ,
    keywords : { type : Array , default : [] } ,
},{ timestamps : true , id : false , versionKey : false });


const UserLocaltonSearchModel = mongoose.model("user_localton_search", UserLocaltonSearchSchema );

export default UserLocaltonSearchModel;
