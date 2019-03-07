import express from "express";
import check from "../web/middlewares/check";
import User from "../web/controller/user/user";

const router = express.Router();


router.post("/login.json", User.login );
router.get("/isLogin.json", User.isLogin );
router.post("/vcode.json", User.verifyCode );
router.post("/modify.json", check.checkUser , User.modify );
router.get("/logout.json", User.logout );
router.get("/searchHistory.json", check.checkUser , User.getSearchHistory );
router.get("/clearHistory.json", check.checkUser , User.clearSearchHistory );

export default router;