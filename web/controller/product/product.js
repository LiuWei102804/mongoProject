import check from "../../middlewares/check";
import ProductModel from "../../models/product/product";
import Request from "../../prototype/request";
import fs from "fs";
import path from "path";





class Product {
    constructor(){

    }
    /*
    *   新增商品
    * */
    async saveOne( req, res , next ){
        const request = new Request();
        const body = req.body;

        try{
            if( !Boolean( body.name ) ) {
                throw new Error( "商品名称不能为空" );
            }
            if( !Boolean( body.price ) ) {
                throw new Error( "商品价格不能为空" );
            }
            if( !Array.isArray( body.pics ) || body.pics.length == 0 ) {
                throw new Error( "至少一张图片" );
            }

            await ProductModel.create( body );
            request.setCode( 200 );
            request.setMsg( "成功" );
            res.send( request );
        } catch( e ) {
            request.setCode( 400 );
            request.setMsg( e.message );
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
    *   通过分页查询商品
    * */
    async getProductByLimit( req, res , next ){
        const request = new Request();
        const query = req.query;

        let offset = 0,limit = 10;
        try{
            const data = await ProductModel.find({}).limit(limit).skip(offset).exec();

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

        const id = body.id;
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

        try{
            await fs.renameSync( req.file.path , req.file.path + "." + lastname );
            request.setCode(200);
            request.setMsg("成功");

            request.setResult( `http://${req.host}:8999/${req.file.path.split( path.sep ).join("/") + lastname}`)
        } catch ( e ) {
            request.setCode(500);
            request.setMsg( e.message );
        } finally {
            //console.log( `req.origin ===============   ${req.origin}` )
            res.send( request );
        }
    }
    /*
    *   测试
    * */
    async test( req, res , next ){
        const request = new Request();

        console.log( `id ========= ${ req.params.id }` )

        res.send(req.params)
    }
}


export default new Product();