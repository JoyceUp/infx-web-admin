/**
 * Created by zlp on 2017-12-10.
 */



let express = require('express');
let router =  express.Router();
let login = require("../../app/controller/prod/login");

/**
 * 登录用户
 * **/

router.post("/signup",login.signUp);
router.post("/logout",login.logout);




module.exports = router;