/**
 *   Created by XWang on 2018-01-03
 * */

let express = require('express');
let router = express.Router();
let sale = require("../../app/controller/prod/sale");

//根据条件获取销售列表
router.post("/getSaleList", sale.getSaleList);

//销售详情
router.post("/getSalerBaseInfo", sale.getSalerBaseInfo);

//客户信息
router.post("/getCustomerList", sale.getCustomerList);

//代理信息
router.post("/getSalerAgentList", sale.getSalerAgentList);

//余额返利
router.post("/getBackEarnList", sale.getBackEarnList);
//余额返利详情
router.post("/getBackEarnDetail", sale.getBackEarnDetail);

//交易返佣
router.post("/getBrokerageList", sale.getBrokerageList);

//销售提成
router.post("/getDeductionList", sale.getDeductionList);

//销售明细
router.post("/getDeductionDialogsList", sale.getDeductionDialogsList);

//销售津贴列表
router.post("/getAllowanceList", sale.getAllowanceList);

//销售津贴明细
router.post("/getAllowanceDialogsList", sale.getAllowanceDialogsList);

/*
 * Created by szt 2018.01.03.
 */

//人员管理
router.post("/hr/list", sale.personnelList);            //人员列表
router.post("/hr/add", sale.addPersonnel);              //添加销售
router.post("/hr/info", sale.personnelSingle);          //销售基本信息
router.post("/hr/remove", sale.delPersonnel);           //删除销售
router.post("/hr/update", sale.updatePersonnel);        //更新销售
router.post("/hr/update_password", sale.updatePassWordPersonnel);//更新销售密码

//机构管理
router.post("/department/listpage",sale.departmentList);     //获取组织树
router.post("/company/add",sale.addCompany);                 //添加公司
router.post("/department/add",sale.addDepartment);           //添加部门
router.post("/team/add",sale.addTeam);                       //添加组别

router.post("/company/edit",sale.editCompany);                 //编辑公司
router.post("/department/edit",sale.editDepartment);           //编辑部门
router.post("/team/edit",sale.editTeam);                       //编辑组别

router.post("/company/remove",sale.removeCompany);                 //删除公司
router.post("/department/remove",sale.removeDepartment);           //删除部门
router.post("/team/remove",sale.removeTeam);                       //删除组别

module.exports = router;