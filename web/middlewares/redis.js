import client from "../../redis/redis";

class RedisReserve {
    constructor(){

    }
    /*
    *   获取缓存信息
    * */
    async getValue( key ){
        return new Promise( async( resolve , reject ) => {
            client.get( key ,( err , value ) => {
                if( err ) {
                    reject( err );
                } else {
                    resolve( value );
                }
            })
        }).catch( err => {
            reject( err );
        })
    }
    /*
    *   设置缓存信息
    * */
    async setValue( key , value , expire = 60 ){
        return new Promise( async( resolve , reject ) => {
            client.set( key , value , ( err ) => {
                if( err ) {
                    reject( err );
                } else {
                    resolve( "ok" );
                }
                client.expire( key , expire )
            })

        }).catch( err => {
            reject( err );
        })
    }
    /*
    *   设置过期时间
    * */
    async expire( key , expire = 60 ){
        client.expire( key , expire )
    }
}

export default new RedisReserve();