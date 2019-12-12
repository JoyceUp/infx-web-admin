/**
 * Created by szt 2018.01.03.
 */



let express = require('express');
let router = express.Router();
let money = require("../../app/controller/dev/money");

// 入金
router.post("/deposit/list", money.depositList);
router.post("/deposit/handle_money", money.handleDeposit);
router.post("/deposit/confirm_money", money.confirmDeposit);
router.post("/deposit/ignore", money.ignoreDeposit);

//出金
router.post("/withdraw/list", money.withdrawList);
router.post("/withdraw/handle_money", money.handleWithdraw);
router.post("/withdraw/confirm_money", money.confirmWithdraw);
router.post("/withdraw/ignore", money.ignoreWithdraw);

//转账管理
router.post("/transfer/list", money.transferList);
router.post("/transfer/handle", money.handleTransferMoney);
router.post("/transfer/ignore", money.ignoreTransferMoney);

//余额清零管理
router.post("/clean_balance/list", money.accountList);
router.post("/clean_balance/handle", money.cleanAccountBalance);
router.post("/clean_balance/ignore", money.ignoreCleanAccountBalance);

//返利转余额
router.post("/rebate/list", money.rebateList);

module.exports = router;