/**
 *   Created by XWang on 2018-01-05
 * */


let express = require('express');
let router = express.Router();
let relation = require("../../app/controller/dev/relation");

//客户归属变更
//同代理账号关系变更-客户列表
router.post("/customer_list", relation.getCustomerList);

//选择代理
router.post("/proxy_list", relation.getProxyList);

//选择销售
router.post("/sale_list", relation.getSaleList);

//账号重新匹配-账户类型
router.post("/options", relation.getAccountOptions);
//账号重新匹配-账号列表
router.post("/account_list", relation.getAccountList);

//变更客户归属记录
router.post("/customer_modified", relation.getCustomerModifiedLog);

//变更账号归属记录
router.post("/account_modified", relation.getAccountModifiedLog);

//变更代理归属记录
router.post("/proxy_modified", relation.getProxyModifiedLog);
module.exports = router;