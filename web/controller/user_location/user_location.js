import mongoose from "mongoose";
import UserLocation from "../../models/user_location/user_location";
import CheckForm from "../../prototype/checkform";
import Request from "../../prototype/request";
import ProductModel from "../../models/product/product";



class UserLocaltionController extends CheckForm {
    constructor(){
        super();

        this.saveOne = this.saveOne.bind( this );
        this.updateOne = this.updateOne.bind( this );
        this.userLocations = this.userLocations.bind( this );
        this.deleteOne = this.deleteOne.bind( this );
    }
    /*
    *   保存地址
    * */
    async saveOne( req, res , next ){
        const request = new Request();
        let { province , city , area , street , label , user_real_name , phone } = req.body;
        let { _id } = req.session.uid;

        try{
            const resResult = { code : 400 , message : "" };

            if( this.isEmpty( user_real_name ) ) {
                resResult.message = "真实姓名不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( !this.isPhone( phone ) ) {
                resResult.message = "手机号格式不正确";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( this.isEmpty( province ) ) {
                resResult.message = "省不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( this.isEmpty( city ) ) {
                resResult.message = "市不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( this.isEmpty( area ) ) {
                resResult.message = "区/县不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( this.isEmpty( street ) ) {
                resResult.message = "街道不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            if( label ) {
                switch ( Number( label ) ) {
                    case 1 :
                        req.body.label_str = "家";
                        break;
                    case 2 :
                        req.body.label_str = "公司";
                        break;
                    default :
                        req.body.label_str = "学校";
                }
            }

            req.body["user_id"] = _id;
            await UserLocation.create( req.body );

            request.setCode( 200 );
            request.setMsg( "成功" );
        } catch ( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code || 500 );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   更新地址
    * */
    async updateOne( req, res , next ){
        const request = new Request();
        let { id } = req.body;
        try{
            const resResult = { code : 400 , message : "" };
            
            if( this.isUndefined( id ) || this.isNull( id ) && this.isEmpty( id ) ) {
                resResult.message = "id不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            await UserLocation.findByIdAndUpdate( id , req.body );

            request.setCode( 200 );
            request.setMsg("成功");
        } catch ( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code || 500 );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   查询地址
    * */
    async userLocations( req, res , next ){
        const request = new Request();
        let { _id } = req.session.uid;
        let { offset = 0 , limit = 10 } = req.body;

        try{
            const data = await UserLocation.find({ user_id : _id }).limit( Number( limit ) ).skip( Number( offset ));
            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( data );
        } catch ( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code || 500 );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   删除地址
    * */
    async deleteOne( req, res , next ){
        const request = new Request();
        let { id } = req.body;

        try{
            const resResult = { code : 400 , message : "" };

            if( this.isUndefined( id ) || this.isNull( id ) && this.isEmpty( id ) ) {
                resResult.message = "id不能为空";
                throw new Error( JSON.stringify( resResult ) );
            }
            await UserLocation.deleteOne({ _id : id });
            request.setCode( 200 );
            request.setMsg("成功");

        } catch ( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code || 500 );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
}


export default new UserLocaltionController();

