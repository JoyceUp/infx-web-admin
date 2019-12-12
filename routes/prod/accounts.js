/**
 * created by yuyz  date:2018-01-10
 */
let express = require('express');
let router =  express.Router();
let accounts = require("../../app/controller/prod/accounts.js");
router.post("/accounts/list",accounts.accountsList.customers);
router.post('/accounts/info',accounts.accountsList.customerInfo);
router.post('/accounts/enable',accounts.accountsList.enableAccount);
router.post('/accounts/customer/export',accounts.accountsList.exportCustomer);

router.post("/accounts/agent/list",accounts.accountsList.agents);
router.post("/accounts/agent/info",accounts.accountsList.agentInfo);
router.post('/accounts/agent/export',accounts.accountsList.exportAgent);
router.post("/accounts/deposit/list",accounts.accountsList.depositList);

//开户待审核
router.post("/pending/accounts/list",accounts.accountsList.reviewLists);
router.post('/pending/accounts/info',accounts.accountsList.reviewInfo);
router.post('/pending/accounts/file/open',accounts.accountsList.openAccountByFile);     //文件审核
router.post('/pending/accounts/open',accounts.accountsList.openAccount);                //开户
router.post('/pending/accounts/reject',accounts.accountsList.rejectAccount);
router.post('/pending/accounts/customer/export',accounts.accountsList.exportReview);


module.exports = router;