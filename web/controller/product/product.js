import dtime from "time-formater";
import check from "../../middlewares/check";
import ProductModel from "../../models/product/product";
import Request from "../../prototype/request";
import fs from "fs";
import path from "path";





class ProductController {
    constructor(){

    }
    /*
    *   新增商品
    * */
    async saveOne( req, res , next ){
        const request = new Request();
        const body = req.body;
        let { _id , nick_name } = req.session.uid;

        try{
            if( !Boolean( body.name ) ) {
                throw new Error(JSON.stringify({ code : 400 , message : "商品名称不能为空"}) );
            }
            if( !Boolean( body.price ) ) {
                throw new Error(JSON.stringify({ code : 400 , message : "商品价格不能为空"}) );
            }
            if( !Array.isArray( body.pics ) || body.pics.length == 0 ) {
                throw new Error(JSON.stringify({ code : 400 , message : "至少一张图片"}) );
            }
            body["user_id"] = _id;
            body["user_nick_name"] = nick_name;
            await ProductModel.create( body );
            request.setCode( 200 );
            request.setMsg( "成功" );
            res.send( request );
        } catch( e ) {
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   通过ID查询商品信息
    * */
    async getProductById( req, res , next ){
        const request = new Request();
        const query = req.query;

        try{
            if( !Boolean( query.id ) ) {
                throw new Error("id不能为空");
            }
            const data = await ProductModel.findById( query.id );
            if( data ) {
                request.setCode(200);
                request.setMsg("成功");
                request.setResult( data );
            } else {
                request.setCode(200);
                request.setMsg("成功");
                request.setResult( [] );
            }
        } catch ( e ) {
            request.setCode(400);
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   通过用户查询商品
    * */
    async getProductByUser( req, res , next ){
        const request = new Request();
        const { userId , offset = 0 , limit = 10 } = req.query;

        try{
            if( !Boolean( userId ) ) {
                throw new Error("userId不能为空");
            }
            const data = await ProductModel.find({ user_id : userId }).limit(Number( limit )).skip(Number( offset ));
            if( data ) {
                request.setCode(200);
                request.setMsg("成功");
                request.setResult( data );
            } else {
                request.setCode(200);
                request.setMsg("成功");
                request.setResult( [] );
            }
        } catch ( e ) {
            request.setCode(400);
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   通过分页查询商品
    * */
    async getProductByLimit( req, res , next ){
        const request = new Request();
        let { offset = 0,limit = 10 } = req.query;

        try{
            const data = await ProductModel.find({}).limit(Number( limit )).skip(Number( offset ));

            request.setCode( 200 );
            request.setMsg("成功");
            request.setResult( data );
        } catch ( e ) {
            request.setCode(400);
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   更新商品
    * */
    async update( req, res , next ){
        const request = new Request();
        const body = req.body;

        const { id } = body;
        delete body.id;
        try{
            if( !Boolean( id ) ) {
                throw new Error("商品id不能为空");
            }
            await ProductModel.findByIdAndUpdate( id , body );

            request.setCode( 200 );
            request.setMsg("成功");
        } catch (e) {
            request.setCode(400);
            request.setMsg( e.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   上传图片
    * */
    async uploadPic( req, res , next ){
        const request = new Request();
        let lastname = path.extname( req.file.originalname );

       // res.send(200);
        try{
            let paths = req.file.path.split( path.sep );
            paths.shift();
            fs.renameSync( req.file.path , req.file.path + lastname );
            request.setCode(200);
            request.setMsg( "成功" );

            request.setResult( `${req.protocol}://${req.hostname}:8999/${paths.join("/") + lastname}`)
        } catch ( e ) {
            request.setCode(500);
            request.setMsg( "服务器错误" );
        } finally {
            res.send( request );
        }
    }
    /*
    *   获取热门商品
    * */
    async hotProducts( req, res , next ){
        const request = new Request();
        let { offset = 0 , limit = 10 } = req.query;

        try{
            let data = await ProductModel.find({}).limit(Number( limit )).skip(Number( offset )).sort({ sales_volume : -1 });
            if( data ) {
                request.setCode( 200 );
                request.setMsg( "成功" );
                request.setResult( data );
            } else {
                throw new Error(JSON.stringify({ code : 500 , message : "服务器错误" }));
            }
        } catch ( e ) {
            let message = JSON.parse( e.message );
            request.setCode( message.code );
            request.setMsg( message.message );
        } finally {
            res.send( request );
        }
    }
    /*
    *   测试
    * */
    async test( req, res , next ){
        const request = new Request();

        //console.log( `id ========= ${ req.params.id }` )

        res.send(req.params)
    }
}


export default new ProductController();