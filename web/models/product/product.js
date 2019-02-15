import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name : String ,
    ctime : { type : Date , default : Date.now } ,
    userId : String ,
    pics : Array ,
    price : String
});

productSchema.index({ id : 1 });
const Product = mongoose.model("product", productSchema );

export default Product;