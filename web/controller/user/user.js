//import UUID from "uuid";
import log from "../../util/log4jsUtil";
import UserModel from "../../models/user/user";
import dtime from "time-formater";
import UserLocaltonSearchModel from "../../models/user_location_search/user_location_search";
import CheckForm from "../../prototype/checkform";
import RedisReserve from "../../middlewares/redis";
import Request from "../../prototype/request";
import { isPhone } from "../../../public/common";




class User extends CheckForm {
    constructor(){
        super();

        this.login = this.login.bind( this );
        this.isLogin = this.isLogin.bind( this );
        this.verifyCode = this.verifyCode.bind( this );
        this.logout = this.logout.bind( this );
        this.modify = this.modify.bind( this );
        this.searchLocation = this.searchLocation.bind( this );
        this.getSearchHistory = this.getSearchHistory.bind( this );
    }
    /*
    *   注册登录
    * */
    async login( req , res , next ){
        let request = new Request();
        try{
            let body = req.body;
            if( req.session.uid ) {
                let { account } = req.session.uid;
                if( account == body.account ) {
                    request.setResult( req.session.uid );
                    throw new Error(JSON.stringify({ code : 401 , message : "该账号已登录" }));
                }
            }
            if( !this.isPhone( body.account ) ) {
                throw new Error(JSON.stringify( { code : 400 , message : "账号不正确" } ));
            }
            if( this.isEmpty( body.code ) ) {
                throw new Error(JSON.stringify({ code : 400 , message : "验证码不能为空" }));
            }

            let data = await RedisReserve.getValue( body.account );
            if( data ) {
                let beforeCode = JSON.parse( data ).code;
                if( body.code != beforeCode ) {
                    throw new Error(JSON.stringify({ code : 400 , message : "验证码不正确" }));
                }
            } else {
                throw new Error(JSON.stringify({ code : 400 , message : "验证码超时" }));
            }

            let findParam = { account : body.account };
            let check = await UserModel.findOne( findParam );
            let user = check ? check : await UserModel.create( findParam );

            req.session.uid = user;
            request.setCode(200);
            request.setMsg("成功");
            request.setResult( user );

        } catch( e ) {
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );

        } finally {
            res.send( request );
        }
    }
    /*
    *   自动登录
    * */
    async isLogin( req , res , next ){
        let request = new Request();

        try{

            if( req.session.uid ) {
                request.setMsg("成功");
                request.setCode(200);
                request.setResult( req.session.uid );
            } else {
                request.setCode(401);
                request.setMsg("session过期，重新登录");
            }
        } catch( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );

        } finally {
            res.send( request );
        }
    }
    /*
    *   发送验证码
    * */
    async verifyCode( req, res , next ){
        let request = new Request();
        try{
            let body = req.body;
            if( !this.isPhone( body.account ) ) {
                throw new Error(JSON.stringify( { code : 400 , message : "账号不正确" } ));
            };
            let data = await RedisReserve.getValue( body.account );
            if( data ) {
                let beforeTime = JSON.parse( data ).ctime;
                if( Date.now() - beforeTime <= 60000 ) {
                    throw new Error(JSON.stringify( { code : 400 , message : "发送过于频繁" } ));
                }
            }

            let random = Math.floor( ( Math.random() + 1 ) * 100000 );
            let redisData = {
                code : random ,
                ctime : Date.now()
            }
            await RedisReserve.setValue( body.account , JSON.stringify( redisData ) );
            request.setCode(200);
            request.setMsg("成功");
            request.setResult( random );
        } catch ( e ) {
            console.log( e.message )
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );

        } finally {
            res.send( request );
        }
    }
    /*
    *   退出登录
    * */
    async logout( req, res , next ){
        let request = new Request();

        try{
            if( req.session.uid ) {
                delete req.session.uid;
                request.setCode( 200 );
                request.setMsg( "成功" );
            } else {
                throw new Error(JSON.stringify( { code : 400 , message : "当前账号未登录" } ));
            }
        } catch (e) {
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    };
    /*
    *   修改资料
    * */
    async modify( req, res , next ){
        let request = new Request();
        let { nick_name , real_name , gender , avatar } = req.body;
        let { _id } = req.session.uid;

        try{
            if( Boolean( req.session.uid.real_name ) ) {
                request.setMsg( "真实姓名只能绑定一次" );
            } else {
                if( gender ) {
                    if( gender == 1 ) {
                        req.body.gender_remark = "男";
                    } else if( gender == 0 ) {
                        req.body.gender_remark = "女";
                    } else {
                        req.body.gender_remark = "未知";
                    }
                }

                await UserModel.findByIdAndUpdate( _id , req.body );
                let result = await UserModel.findById( _id );
                req.session.uid = result;
                request.setMsg( "成功" );
                request.setResult( result );
            }

            request.setCode( 200 );

        } catch ( e ) {
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   添加地址搜索历史
    * */
    async searchLocation( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;
        let { word } = req.body;

        try{
            let result = await UserLocaltonSearchModel.findOne({ user_id : _id });
            let keywords;
            let data = { create_time : dtime( Date.now() ).format("YYYY-MM-DD HH:mm:ss") , word : word };

            if( !result ) {
                keywords = [ data ];
                result = await UserLocaltonSearchModel.create({ keywords : keywords , user_id : _id });
            } else {
                keywords = result.keywords;
                keywords.push( data );
                if( keywords.length > 10 ) {
                    keywords.length = 10;
                };
                await UserLocaltonSearchModel.findOneAndUpdate({ user_id : _id },{ $set : { keywords : keywords } });
            }

        } catch ( e ) {
            res.send({ code : 500 , msg : "服务器错误"})
            console.log( e );
        } finally {
        }
        next();
    }
    /*
    *   获取搜索历史记录
    * */
    async getSearchHistory( req , res , next ){
        const request = new Request();
        let { _id } = req.session.uid;

        try{
            let result = await UserLocaltonSearchModel.findOne({ user_id : _id });

            request.setCode( 200 );
            request.setMsg( "成功" );
            request.setResult( result );
        } catch ( e ) {

        } finally {
            res.send( request );
        }
    }
}


export default new User();