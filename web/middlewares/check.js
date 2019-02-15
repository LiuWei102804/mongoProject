import Request from "../prototype/request";

class Check{
    constructor(){

    }
    async checkUser( req, res , next ){
        let request = new Request();
        const token = req.session.token;

        try{
            throw new Error("请先登录");
        } catch ( e ) {
            if( !token ) {
                request.setCode( 400 );
                request.setMsg( e.message );
                res.send( request );
                return;
            }

        }
        next()
    }
}

export default new Check();