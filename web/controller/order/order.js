import dtime from "time-formater";
import uuid from "uuid";
import OrderModel from "../../models/order/order";
import shopcarModel from "../../models/shopcar/shopcar";
import Request from "../../prototype/request";


class OrderController {
    constructor(){
        this.place = this.place.bind( this );
        this.queryOrderByFilter = this.queryOrderByFilter.bind( this );
        this.delOrderItem = this.delOrderItem.bind( this );
    }
    /*
    *   生成订单
    * */
    async place( req, res , next ){
        const request = new Request();
        let { _id , real_name , avatar , nick_name } = req.session.uid;
        let { goods } = req.body;

        let updateShopCarData = [];
        try{
            if( !Boolean( goods ) ) {
                request.setCode( 400 );
                throw new Error("商品不能为空");
            };
            let price = 0;
            let shopcarData = await shopcarModel.findOne( { user_id : _id } );
            shopcarData.shopcar_goods.forEach(( item , index , arr ) => {
                goods.forEach(function ( val ) {
                    if( item._id == val._id ) {
                        arr.splice( index , 1 );
                    }
                })
            });
            updateShopCarData = shopcarData.shopcar_goods;
            console.log( updateShopCarData )
            // await shopcarModel.findOneAndUpdate({ user_id : _id } , { $set : { shopcar_goods : updateShopCarData } });
            //
            // goods.forEach(item => {
            //     price += item.price * item.count;
            // });
            // let data = {
            //     order_num : `order${Date.now()}` ,
            //     user_id : _id ,
            //     user_real_name : real_name ,
            //     user_avatar : avatar ,
            //     user_nick_name : nick_name ,
            //     goods : goods ,
            //     order_price : price.toFixed(2)
            // };
            // let result = await OrderModel.create( data );
            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( result );

        } catch (e) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   查询订单信息
    * */
    async queryOrderByFilter( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;
        let { state = 0 , offset = 0 , limit = 10 } = req.query;

        try{
            let result;
            if( state != 0 ) {
                result = await OrderModel.find({ user_id : _id , state : Number( state ) }).limit(Number( limit )).skip(Number( offset ));
            } else {
                result = await OrderModel.find({ user_id : _id }).limit(Number( limit )).skip(Number( offset ));
            }

            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( result );
        } catch( e ) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   取消订单
    * */
    async delOrderItem( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;
        let { orderId } = req.query;

        try{
            if( !Boolean( orderId ) ) {
                throw new Error("订单id不能为空");
            }
            let result = await OrderModel.findOneAndUpdate( { _id :  orderId } , { $set : { state : 3 , state_remark : "已取消" } } );

            request.setCode( 200 );
            request.setMsg("成功");
        } catch ( e ) {
            request.setCode( 400 );
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
}

export default new OrderController();