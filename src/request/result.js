import HttpStatus from "./httpStatus";

export default class Request extends HttpStatus {
    constructor(){
        super();
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
    isEmpty( value ){
        return value.replace(/^\s+|\s+$/g,"") == "";
    }
    isEmptyArray( array ){
        return array.length == 0;
    }
}