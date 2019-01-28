import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
   user_name : String ,
   password : String ,
   id : Number ,
   create_time : String ,
   avatar : { type : String , default : "default.jpg" } ,
   city : String
});


userSchema.index({id : 1 });
const User = mongoose.model("User",userSchema);

export default User;