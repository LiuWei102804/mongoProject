import express from "express";
import check from "../web/middlewares/check";
import ShopCar from "../web/controller/shopcar/shopcar";

const router = express.Router();


router.get("/add.json" , check.checkUser , ShopCar.add );
router.get("/shopcar.json" , check.checkUser , ShopCar.getShopCarData );
router.get("/changeCount.json" , check.checkUser , ShopCar.changeCount );
router.get("/remove.json" , check.checkUser , ShopCar.removeGoodFromShopCar );


export default router;