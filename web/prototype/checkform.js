class CheckForm {
    constructor(){

    }
    /*
    *   是否为空
    * */
    isEmpty( val ){
        return val.toString().replace(/^\s+|\s+$/g) === "";
    }
    /*
    *   手机检测
    * */
    isPhone( val ){
        return /^1[3|4|5|7|8|6|9][0-9]{9}$/.test( val );
    }
    /*
    *   是不是null
    * */
    isNull( val ){
        return null == val;
    }
    /*
    *   是不是undefined
    * */
    isUndefined( val ){
        return typeof val === "undefined";
    }
}

export default CheckForm;