import express from "express";
import Position from "../web/controller/position/position";

const router = express.Router();


router.get("/getLocation.json", Position.getLocation );
router.post("/search.json", Position.queryByKeyword );

export default router;