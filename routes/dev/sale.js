/**
 *   Created by XWang on 2018-01-03
 * */




let express = require('express');
let router = express.Router();
let sale = require("../../app/controller/dev/sale");

//根据条件获取销售列表
router.post("/list", sale.getSaleList);

//销售详情
router.post("/base", sale.getSaleBaseInfo);

//客户信息
router.post("/customer", sale.getCustomerList);

//代理信息
router.post("/proxy", sale.getProxyList);

//返佣返利信息
//router.post("/rebate", sale.getRebateList);

//客户余额返利
router.post("/customer_balance_rebate", sale.getCustomerBalanceRebate);

//客户交易返佣
router.post("/customer_transaction_rebate", sale.getCustomerTransactionRebate);

//代理余额返利
//router.post("/proxy_balance_rebate", sale.getProxyBalanceRebate);



//提成信息
router.post("/deduct", sale.getDeductList);



/*
 * Created by szt 2018.01.03.
 */



//人员管理
router.post("/personnel/list", sale.personnelList);
router.post("/personnel/add", sale.addPersonnel);
router.post("/personnel/personnelSingle", sale.personnelSingle);
router.post("/personnel/del", sale.delPersonnel);
router.post("/personnel/update", sale.updatePersonnel);

//机构管理
router.post("/department/listpage",sale.departmentList);
router.post("/department/add",sale.addDepartment);
router.post("/department/remove",sale.removeDepartment);
router.post("/department/edit",sale.editDepartment);
module.exports = router;