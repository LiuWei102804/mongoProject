import dtime from "time-formater";
import ProductModel from "../../models/product/product";
import shopcarModel from "../../models/shopcar/shopcar";
import Request from "../../prototype/request";


class ShopCarController{
    constructor(){
        this.add = this.add.bind( this );
        this.changeCount = this.changeCount.bind( this );
    }
    /*
    *   添加购物车数据
    * */
    async add( req, res , next ){
        const request = new Request();
        let { _id , nick_name } = req.session.uid;
        let { id , count } = req.query;
        try{
            if( !Boolean( id ) ) {
                request.setCode( 400 );
                throw new Error("商品id不存在");
            }
            if( !Boolean( count ) ) {
                request.setCode( 400 );
                throw new Error("商品数量不存在");
            }
            let result = await shopcarModel.findOne({ "user_id" : _id });
            let goods,
                good = await ProductModel.findById( id );
            if( result == null ) {
                goods = [];
                goods.push( { count : count , ...good._doc } );
                await shopcarModel.create({ user_id : _id , user_nick_name : nick_name , shopcar_goods : goods , all_price : good.price * count , all_count : count });
            } else {
                goods = result.shopcar_goods;
                goods.push({ count : count , ...good._doc });

                await shopcarModel.update({ user_id : _id  } , {  shopcar_goods : goods , all_price : +result.all_price + good.price * count , all_count : +result.all_count + +count });
            }
            request.setCode( 200 );
            request.setMsg("成功");
        } catch ( e ) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   单品数量添加
    * */
    async changeCount( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;
        let { id , count } = req.query;

        try{
            if( !Boolean( id ) ) {
                request.setCode( 400 );
                throw new Error("商品id不能为空");
            }
            let result = await shopcarModel.findOne({ user_id : _id });
            let index;
            if( result ) {
                let filter = result.shopcar_goods.filter( ( item , index ) => {
                    index = index;
                    return item._id == id
                });
                let diffCount = count - filter[0].count;
                let diffPrice = filter[0].price * diffCount;

                filter[0].count = count;
                result.shopcar_goods[index] = filter[0];
                await shopcarModel.findOneAndUpdate({ user_id : _id } , { shopcar_goods : result.shopcar_goods , all_price : ( +result.all_price + diffPrice ).toFixed(2) , all_count : result.all_count + diffCount });
            }
            request.setCode( 200 );
            request.setMsg( "成功" );
        } catch (e) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   移除购物车
    * */
    async removeGoodFromShopCar( req, res , next ){
        const request = new Request();
        let { orderId, goodId } = req.query;

        try{
            let { shopcar_goods } = await shopcarModel.findById( orderId );
            let newData = shopcar_goods.filter( item => item._id != goodId );
            await shopcarModel.findByIdAndUpdate( orderId , { $set : { shopcar_goods : newData }});

            request.setCode( 200 );
            request.setMsg("成功");
        } catch ( e ) {
            request.setCode( 400 );
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   查询购物车数据
    * */
    async getShopCarData( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;

        try{
            let result = await shopcarModel.findOne({ user_id : _id });
            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( result );
        } catch ( e ) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   购物车下单
    * */
    async buy( req, res , next ){

    }
}



export default new ShopCarController();
