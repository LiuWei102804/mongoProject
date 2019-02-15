export default class Request{
    constuctor(){
        this.code = 200;
        this.msg = "";
        this.result = null;
    }
    setCode( code ){
        this.code = code;
    }
    setMsg( msg ){
        this.msg = msg;
    }
    setResult( result ){
        this.result = result;
    }
}