import express from "express";
import check from "../web/middlewares/check";
import Product from "../web/controller/product/product";
import upload from "../web/middlewares/multer";

const router = express.Router();


router.get("/getProductById.json" , Product.getProductById );
router.get("/getProductByLimit.json" , Product.getProductByLimit );
router.post("/save.json" , check.checkUser , Product.saveOne );
router.post("/update.json" , check.checkUser , Product.update );
router.post("/uploadPic.json" , check.checkUser , upload.single("avatar") , Product.uploadPic );
router.get("/test/:id" , Product.test );


export default router;