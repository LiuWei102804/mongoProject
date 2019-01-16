export default class Request {
    constructor(){
        this.code = 200;
        this.msg = "请求成功";
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