import express from "express";
import check from "../web/middlewares/check";
import Order from "../web/controller/order/order";


const router = express.Router();

router.post("/place.json", check.checkUser , Order.place );
router.get("/query.json", check.checkUser , Order.queryOrderByFilter );
router.get("/delOrderById.json", check.checkUser , Order.delOrderItem );


export default router;