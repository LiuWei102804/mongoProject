import express from "express";
import Admin from "../web/controller/admin/admin";
const router = express.Router();

router.post("/login.json", Admin.login ); //用户登录
router.get("/user.json",Admin.user ); //用户退出
// router.get("/all",User.getAllAdmin); //所有用户
// router.get("/count",User.getAdminCount); //用户总数
// router.get("/info",User.getAdminInfo); //用户基本信息
//router.post("/update/avatar/:admin_id",User.updateAvatar); //修改用户信息

export default router;