import express from "express";
import User from "../web/controller/user/user";
import Position from "../web/controller/position/position";

const router = express.Router();


router.get("/getLocation.json", Position.getLocation );
router.post("/search.json", User.searchLocation ,  Position.search );

export default router;