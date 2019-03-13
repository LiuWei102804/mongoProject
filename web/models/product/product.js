import mongoose from "mongoose";
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name : String ,
    sub_name : String ,
    seller : Object ,
    user_id : String ,
    pics : Array ,
    price : String ,
    stock : { type : Number , default : 0 } ,
    browse_count : { type : Number , default : 0 } ,
    describe : String ,
    sales_volume : { type : Number , default : 0 }
}, { timestamps : true , id : false , versionKey : false , collection : "product_coll" });

// productSchema.index({ id : 1 });
const ProductModel = mongoose.model("product_coll", ProductSchema );

export default ProductModel;