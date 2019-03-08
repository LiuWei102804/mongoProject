"use strict";
import user from "./user";
import v1 from "./v1";
import product from "./product";
import userLocation from "./user_location";
import postion from "./position";
import shop from "./shopcar";
import order from "./order";

export default app => {
    app.use("/user", user );
    app.use("/v1", v1 );
    app.use("/product" , product );
    app.use("/location" , userLocation );
    app.use("/position" , postion );
    app.use("/shop" , shop );
    app.use("/order" , order );
};