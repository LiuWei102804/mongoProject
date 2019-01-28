import AdminModel from "../../models/admin/user";
import cryoto from "crypto";
import dtime from "time-formater";


class Admin{
    constructor(){

    }
    async login( req , res , next ){
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")

        console.log(" request ...  ========>>>>>>>>>>>>>>>>>  ")
        res.send( 200 );
    }
    async user( req , res , next ){
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")
        console.log("\n")

        console.log(" request ...  ========>>>>>>>>>>>>>>>>>  ")
        res.send( 200 );
    }
}

export default new Admin();