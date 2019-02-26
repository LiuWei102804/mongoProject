"use strict";
import user from "./user";
import v1 from "./v1";
import product from "./product";
import userLocation from "./user_location";

export default app => {
    app.use("/user", user );
    app.use("/v1", v1 );
    app.use("/product" , product );
    app.use("/location" , userLocation );
};