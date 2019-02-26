import express from "express";
import check from "../web/middlewares/check";
import ProductController from "../web/controller/product/product";
import upload from "../web/middlewares/multer";

const router = express.Router();


router.get("/getProductById.json" , ProductController.getProductById );
router.get("/getProductByUser.json" , ProductController.getProductByUser );
router.get("/hotProducts.json" , ProductController.hotProducts );
router.get("/getProductByLimit.json" , ProductController.getProductByLimit );
router.post("/save.json" , check.checkUser , ProductController.saveOne );
router.post("/update.json" , check.checkUser , ProductController.update );
router.post("/uploadPic.json" , check.checkUser , upload.single("avatar") , ProductController.uploadPic );
// router.get("/test/:id" , ProProductControllerduct.test );


export default router;