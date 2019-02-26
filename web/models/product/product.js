import mongoose from "mongoose";
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name : String ,
    user_id : String ,
    user_nick_name : String ,
    pics : Array ,
    price : String ,
    stock : { type : Number , default : 0 } ,
    describe : String ,
    sales_volume : { type : Number , default : 0 }
}, { timestamps : true , id : false , versionKey : false });

// productSchema.index({ id : 1 });
const Product = mongoose.model("product", productSchema );

export default Product;