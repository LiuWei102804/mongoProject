import express from "express";
import Position from "../web/controller/position/position";

const router = express.Router();


router.get("/getLocation.json", Position.getLocation );

export default router;