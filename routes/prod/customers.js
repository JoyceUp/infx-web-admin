
/**
 *created by yuyz  date:2017-01-03
 */
let express = require("express");
let router = express.Router();
let customers = require('../../app/controller/prod/customers.js');
let accounts = require('../../app/controller/prod/accounts.js');
//#潜在客户
router.post('/potentials/listpage',customers.potentials.list);    //列表
router.post('/potentials/info',customers.potentials.info);        //详情

//#注册客户
router.post('/customers/listpage',customers.customers.list);    //列表
router.post('/customers/info',customers.customers.info);        //详情
router.post('/customers/info/address',customers.customers.address_info);        //地址详情
router.post('/customers/info/update',customers.customers.update);        //更新
router.post('/customers/info/remove',customers.customers.remove);        //删除
router.post('/customers/info/bankcard',customers.customers.bankcard);        //注册客户银行信息
router.post('/customers/info/tel_transfer_list',customers.customers.tel_transfer_list);         //注册客户电汇列表
router.post('/customers/info/tel_transfer_info',customers.customers.tel_transfer_info);         //注册客户电汇详情
router.post('/customers/fund/rebate_commission',customers.customers.rebate_commission);         //注册客户返佣信息
router.post('/customers/fund/balance_rebate',customers.customers.balance_rebate);               //注册客户余额返利
router.post('/customers/fund/rebate_detail',customers.customers.rebate_detail);                 //注册客户余额返利明细
router.post('/customers/fund/detail_to_rebate',customers.customers.detail_to_rebate);           //注册客户返利转余额
router.post('/customers/fund/relation_children',customers.customers.relation_children);         //注册客户下级信息
//注册客户账户信息
router.post('/customers/account',customers.account.list);              //列表
router.post('/customers/account/enable',customers.account.enable);     //激活账户
router.post('/customers/account/disable',customers.account.disable);   //禁用账户
router.post('/customers/account/delete',customers.account.delete);     //删除账户
router.post('/customers/account/resend_email',customers.account.resend_email);       //重发开户邮件
router.post('/customers/account/set_read_only',customers.account.set_read_only);     //改账户状态为只读
router.post('/customers/account/update_password',customers.account.update_password); //重置交易密码

//注册客户资金信息
router.post('/customers/fund/deposit_withdraw',customers.fund.deposit_withdraw);        //出入金信息
router.post('/customers/fund/transfer',customers.fund.transfer);        //转账信息
router.post('/customers/fund/clear_balance',customers.fund.clear_balance);        //余额清零信息
router.post('/customers/fund/trade',customers.fund.trade);        //交易信息

//关系管理
router.post('/customers/relation',customers.relation.list);     //列表

//注册客户沟通记录
router.post('/customers/record',customers.record.list);         //列表
router.post('/customers/record/add',customers.record.add);      //添加

/*

//账户管理
router.post('/accounts/list',accounts.accountsList.customers);
router.post('/accounts/agent',accounts.accountsList.agents);//*/
module.exports=router;