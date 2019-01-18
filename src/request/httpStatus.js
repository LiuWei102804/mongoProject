export default class HttpStatus {
    constructor(){

    }
    NO_PARAM_ERROR(){
        return 400;
    }
    NO_ALLOW_ERROR(){
        return 403;
    }
    PARAM_ERROR(){
        return 401;
    }
    NO_PARAM_MSG(){
        return "缺少参数";
    }
    NO_ALLOW_MSG(){
        return "没有权限";
    }
    PARAM_ERROR_MSG(){
        return "参数错误";
    }
}