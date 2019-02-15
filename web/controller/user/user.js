import UserModel from "../../models/user/user";
import Request from "../../prototype/request";
import { isPhone } from "../../../public/common";



class User {
    constructor(){
        this.login = this.login.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
        this.logout = this.logout.bind(this);
    }
    /*
    *   注册登录
    * */
    async login( req , res , next ){
        let request = new Request();
        try{
            let body = req.body;
            if( !isPhone( body.account ) ) {
                request.setCode(400);
                request.setMsg("账号不能为空");
                res.send( request );
            }
            if( !Boolean( body.code ) ) {
                request.setCode(400);
                request.setMsg("验证码不能为空");
                res.send( request );
            }
            if( body.code != req.session.vcode ) {
                request.setCode(400);
                request.setMsg("验证码不正确");
                res.send( request );
            }
            if( Date.now() - req.session.vcodeTime > 60000 ) {
                request.setCode(400);
                request.setMsg("验证码超时");
                res.send( request );
            }
            const user = await UserModel.findOne({ account : body.account },["-_id","-__v"]);
            if( !user ) {
                UserModel.create({ account : body.account },( err , u) => {
                    if( err ) {
                        console.error( err );
                    }
                    request.setCode(200);
                    request.setMsg("成功");
                    request.setResult( u );
                    req.session.token = body.account;
                    res.send( request );
                });

            } else {
                request.setCode(200);
                request.setMsg("成功");
                request.setResult( user );
                req.session.token = body.account;
                res.send( request );
            }
        } catch( e ) {
            request.setCode(500);
            request.setMsg("服务器错误");
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
            if( !isPhone( body.account ) ) {
                request.setCode(400);
                request.setMsg("账号不能为空");
                res.send( request );
            };
            if( req.session.vcodeTime && Date.now() - req.session.vcodeTime < 30000 ) {
                request.setCode(400);
                request.setMsg("发送过于频繁");
                res.send( request );
            }
            let random = await Math.floor( ( Math.random() + 1 ) * 100000 );
            req.session.vcode = random;
            req.session.vcodeTime = Date.now();
            request.setCode(200);
            request.setMsg("成功");
            request.setResult( random );
            res.send( request );
        } catch ( e ) {
            request.setCode(500);
            request.setMsg("服务器错误");
            res.send( request );
        }
    }
    /*
    *   退出登录
    * */
    async logout( req, res , next ){
        let request = new Request();
        if( req.session.token ) {
            delete req.session.token;
        }
        request.setCode(200);
        request.setMsg("成功");
        res.send( request );
    }

}


export default new User();