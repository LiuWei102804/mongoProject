import express from "express";
import CityHandle from "../web/controller/v1/city";

const router = express.Router();


router.get("/cities.json", CityHandle.getCity );
// router.get("/cities/:id", CityHandle.getCityById);
// router.get("/exactaddress", CityHandle.getExactAddress);
// router.post("/addimg/:type", baseHandle.uploadImg);




export default router;