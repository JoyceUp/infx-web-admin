/**
 * Created by zlp on 2017-12-10.
 */



let express = require('express');
let router =  express.Router();
let login = require("../../app/controller/dev/login");




/**
 * 登录用户
 * **/
router.post("/signup",login.signUp);
router.post("/logout",login.logout);
router.post("/setting/info",login.settingInfo);//同步登录用户信息
router.post("/setting/edit",login.settingEdit);//编辑
router.post("/setting/password",login.settingPwd);//修改密码




module.exports = router;