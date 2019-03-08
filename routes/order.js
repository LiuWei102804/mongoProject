import express from "express";
import check from "../web/middlewares/check";
import Order from "../web/controller/order/order";


const router = express.Router();

router.post("/place.json", check.checkUser , Order.place );


export default router;