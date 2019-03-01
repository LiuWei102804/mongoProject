import Request from "../prototype/request";

class Check{
    constructor(){

    }
    async checkUser( req, res , next ){
        let request = new Request();
        const uid = req.session.uid;

        try{
            if( !uid ) {
                throw new Error("请先登录");
            }
        } catch ( e ) {
            request.setCode( 401 );
            request.setMsg( e.message );
            res.send( request );
        }
        next()
    }
}

export default new Check();