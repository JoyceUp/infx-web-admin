/**
 * Created by szt 2018.01.03.
 */



let express = require('express');
let router = express.Router();
let money = require("../../app/controller/prod/bonus");

//#奖金管理
//业绩查询
router.post("/achievement/list", money.achievement.list);           //列表
router.post("/achievement/export", money.achievement.export);       //导出数据
router.post("/achievement/details", money.achievement.details);     //详情
//返利明细
router.post("/interest/list", money.interest.list);                 //列表
router.post("/interest/export", money.interest.export);             //导出数据
//返佣明细
router.post("/commission/list", money.commission.list);             //列表
router.post("/commission/export", money.commission.export);         //导出数据
//已平仓交易明细
router.post("/close_position/list", money.close_position.list);     //列表
router.post("/close_position/export", money.close_position.export); //导出数据
//持仓交易明细
router.post("/position/list", money.position.list);                 //列表
router.post("/position/export", money.position.export);             //导出数据

module.exports = router;