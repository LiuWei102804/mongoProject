/*
*   格式化日期
* */
export const format = ( time , fmt = "yyyy/MM/dd hh:mm:ss" ) => {
    let date = new Date( time );
    var o = {
        "M+": date.getMonth() + 1,                      //month
        "d+": date.getDate(),                           //day
        "h+": date.getHours(),                          //hour
        "m+": date.getMinutes(),                        //minute
        "s+": date.getSeconds(),                        //second
        "q+": Math.floor((date.getMonth() + 3) / 3),   //quarter
        "S": date.getMilliseconds()                     //millisecond
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for ( var k in o )
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length ) );
    return fmt;
}

/*
*   手机号检测
* */
export const isPhone = ( val ) => {
    return /^1[3|4|5|7|8|6|9][0-9]{9}$/.test( val );
}
