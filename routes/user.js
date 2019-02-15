import express from "express";
import User from "../web/controller/user/user";

const router = express.Router();


router.post("/login.json", User.login );
router.post("/vcode.json", User.verifyCode );
router.get("/logout.json", User.logout );

export default router;