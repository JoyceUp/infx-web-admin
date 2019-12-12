/**
 * Created by XWang 2018.03.21.
 */



let express = require('express');
let router = express.Router();
let report = require("../../app/controller/prod/report");

// 入金流量表
router.post("/deposit/list", report.deposit.list);                   //入金流量表
router.post("/deposit/export", report.deposit.export);                   //导出入金流量表

// 出金流量表
router.post("/withdraw/list", report.withdraw.list);                 //出金流量表
router.post("/withdraw/export", report.withdraw.export);                 //导出出金流量表

// 转账流量表
router.post("/transfer/list", report.transfer.list);                  //转账流量表
router.post("/transfer/export", report.transfer.export);                  //导出转账流量表

// 出入金汇总表
router.post("/sum/list", report.sum.list);                                         //出入金汇总表
router.post("/sum/export", report.sum.export);                            //导出出入金汇总表

// 每日账户余额表
router.post("/balance/export", report.balance.export);                  //导出每日账户余额表

// 销售每日入金表
router.post("/deposit_sales/export", report.deposit.export_sales);                  //导出每日账户余额表

// 团队每日净入金表
router.post("/deposit_team/export", report.deposit.export_team);                  //导出每日账户余额表


module.exports = router;