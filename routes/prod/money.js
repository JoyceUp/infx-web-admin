/**
 * Created by szt 2018.01.03.
 */



let express = require('express');
let router = express.Router();
let money = require("../../app/controller/prod/money");

// 入金
router.post("/deposit/list", money.deposit.depositList);                   //入金列表
router.post("/deposit/details", money.deposit.depositDetails);                   //入金详情
router.post("/deposit/confirm", money.deposit.confirmDeposit);                   //财务处理
router.post("/deposit/ignore", money.deposit.ignoreDeposit);                   //财务或资金岗忽略订单
router.post("/deposit/increase", money.deposit.increaseDeposit);                   //资金岗同意资金入账
router.post("/deposit/manual_increase", money.deposit.manualIncreaseDeposit);                   //资金岗手动处理入账后变更状态为已完成
router.post("/deposit/export", money.deposit.exportDeposit);                   //导出数据

//出金
router.post("/withdraw/list", money.withdraw.withdrawList);                 //出金列表
router.post("/withdraw/details", money.withdraw.withdrawDetails);                 //出金详情
router.post("/withdraw/decrease", money.withdraw.decreaseWithdraw);                 //资金岗扣款
router.post("/withdraw/finish", money.withdraw.finishWithdraw);                 //财务给银行打款完成
router.post("/withdraw/ignore", money.withdraw.ignoreWithdraw);                 //资金岗忽略订单
router.post("/withdraw/back", money.withdraw.backWithdraw);                 //资金岗订单退回
router.post("/withdraw/manual_decrease", money.withdraw.manualDecreaseWithdraw);                 //资金岗手动扣款
router.post("/withdraw/export", money.withdraw.exportWithdraw);                 //导出数据
router.post("/withdraw/export_usd", money.withdraw.exportWithdrawUSD);                 //导出数据
router.post("/withdraw/export_idr", money.withdraw.exportWithdrawIDR);                 //导出数据

//转账管理
router.post("/transfer/list", money.transfer.transferList);                  //转账列表
router.post("/transfer/details", money.transfer.transferDetails);                  //转账详情
router.post("/transfer/ignore", money.transfer.ignoreTransfer);                  //资金岗忽略转账订单
router.post("/transfer/manual_transfer", money.transfer.manualTransferTransfer);                  //资金岗手动完成转账
router.post("/transfer/transfer", money.transfer.transferTransfer);                  //资金岗完成转账
router.post("/transfer/export", money.transfer.exportTransfer);                  //导出数据

//余额清零管理
router.post("/clear_balance/list", money.clearBalance.clearBalanceList);                  //余额清零列表
router.post("/clear_balance/details", money.clearBalance.clearBalanceDetails);                  //余额清零详情
router.post("/clear_balance/clear", money.clearBalance.clearClearBalance);                  //资金岗完成余额清零
router.post("/clear_balance/ignore", money.clearBalance.ignoreClearBalance);                  //资金岗忽略订单
router.post("/clear_balance/manual_clear", money.clearBalance.manualClearClearBalance);                  //资金岗手动完成余额清零
router.post("/clear_balance/export", money.clearBalance.exportClearBalance);                  //导出数据

//返利管理
router.post("/rebate/list", money.rebate.list);                                         //返利列表

router.post("/rebate/one_day", money.rebate.one_day);                                   //某天的列表
router.post("/rebate/export_one_day", money.rebate.export_one_day);                     //导出某天列表
router.post("/rebate/confirm_one_day", money.rebate.confirm_one_day);                   //审核通过
router.post("/rebate/repeat_one_day", money.rebate.repeat_one_day);                     //重新读取某天余额

router.post("/rebate/one_day_info_list", money.rebate.one_day_info_list);               //客户列表
router.post("/rebate/one_day_info_list_summary", money.rebate.one_day_info_list_summary);//统计
router.post("/rebate/export_one_day_info_list", money.rebate.export_one_day_info_list); //导出客户列表


//返利转余额
router.post("/rebate_to_balance/list", money.rebateToBalance.rebateToBalanceList);          //返利转余额列表
router.post("/rebate_to_balance/details", money.rebateToBalance.rebateToBalanceDetails);    //返利转余额详情
router.post("/rebate_to_balance/export", money.rebateToBalance.rebateToBalanceExport);      //导出数据

//返佣补算
router.post("/rebate_lost/process_lost_commission", money.rebateLost.commission);       //返佣补算
//提成补算
router.post("/rebate_lost/process_lost_reward", money.rebateLost.reward);       //返佣补算

//跨系统内部转账
router.post("/internal_transfer_of_system/account_info", money.internalTransferOfSystem.account_info);       //获取两个账户信息
router.post("/internal_transfer_of_system/out", money.internalTransferOfSystem.out);       //转出
router.post("/internal_transfer_of_system/in", money.internalTransferOfSystem.in);       //转入

module.exports = router;