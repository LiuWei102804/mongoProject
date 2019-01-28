"use strict";
import admin from "./admin";
import v1 from "./v1";

export default app => {
    app.use("/user", admin );
    app.use("/v1", v1 );
};