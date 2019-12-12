/**
 * created by yuyz  date:2018-01-10
 */
let express = require('express');
let router =  express.Router();
let accounts = require("../../app/controller/dev/accounts.js");
router.post("/accounts/listpage",accounts.accountsList);
/*router.post('/accounts/detail',accounts.getAccountById);
router.post('/accounts/update',accounts.updateAccount);*/
module.exports = router;