import express from "express";
import check from "../web/middlewares/check";
import UserLocaltionController from "../web/controller/user_location/user_location";


const router = express.Router();


router.post( "/save.json" , check.checkUser , UserLocaltionController.saveOne );
router.post( "/update.json" , check.checkUser , UserLocaltionController.updateOne );
router.get( "/query.json" , check.checkUser , UserLocaltionController.userLocations );
router.post( "/deleteOne.json" , check.checkUser , UserLocaltionController.deleteOne );


export default router;