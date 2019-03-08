import dtime from "time-formater";
import uuid from "uuid";
import OrderModel from "../../models/order/order";
import Request from "../../prototype/request";


class OrderController {
    constructor(){
        this.place = this.place.bind( this );
    }
    async place( req, res , next ){
        const request = new Request();
        let { _id , real_name } = req.session.uid;
        let { goods } = req.body;

        try{
            if( !Boolean( goods ) ) {
                request.setCode( 400 );
                throw new Error("商品不能为空");
            };
            let price = 0;
            goods.forEach(item => {
                price += +item.price;
            });
            let data = {
                order_num : `order${Date.now()}` ,
                user_id : _id ,
                user_real_name : real_name ,
                goods : goods ,
                order_price : price.toFixed(2)
            };
            let result = await OrderModel.create( data );
            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( result );

        } catch (e) {
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
}

export default new OrderController();