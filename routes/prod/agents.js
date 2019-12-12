/**
 *created by cuiyajuan  date:2017-01-03
 */
let express = require('express');
let router =  express.Router();
let agents = require("../../app/controller/prod/agents");


/**
 * 代理
 * **/

//#登记待审核代理
router.post('/agents_register/listpage',agents.agentRegister.list); //列表查询
router.post('/agents_register/info',agents.agentRegister.info);     //详情
router.post('/agents_register/agrees',agents.agentRegister.agre);   //同意 （重发）
router.post('/agents_register/refuses',agents.agentRegister.refu);  //拒绝
//#注册待审核列表
router.post('/agents_pendlist/listpage',agents.pendAgents.list);    //列表
router.post('/agents_pendlist/agrees',agents.pendAgents.agre);    //同意 （重发）
router.post('/agents_pendlist/refuses',agents.pendAgents.refu);    //拒绝
/*代理注册信息*/
// router.post('/agents_register/details',agents.agentRegisterDetails);
/* 审核 （同意，拒绝） */
// router.post('/agents_list/agrees',agents.updateAgrees);
// router.post('/agents_list/refuses',agents.updateRefuses);
//#潜在代理
router.post('/agents_potential/listpage',agents.agentPotential.list);    //列表
router.post('/agents_potential/info',agents.agentPotential.info);       //详情
//#代理列表*
router.post('/agents/listpage',agents.agents.list);     //列表
router.post('/agents/info',agents.agents.info);         //详情
router.post('/agents/info/update',agents.agents.update);//更新
router.post('/agents/info/remove',agents.agents.remove);//删除
router.post('/agents_bankcard/listpage',agents.agents.bankcard); //银行信息
router.post('/agents_tt/listpage',agents.agents.tt);             //电汇信息

router.post('/agents_account/listpage',agents.agents.account);   //代理账户信息
router.post('/agents_account/enable',agents.agents.enable);      //代理账户信息   启用
router.post('/agents_account/disable',agents.agents.disable);    //代理账户信息   禁用
router.post('/agents_account/delete',agents.agents.delete);      //代理账户信息   删除
router.post('/agents_account/resend_email',agents.agents.resend_email);   //代理账户信息  重发开户邮件

router.post('/agents_customer/listpage',agents.agents.customer);     //代理客户信息
router.post('/agents_dep_draw/listpage',agents.agents.dep_draw);     //代理资金信息 出入金信息
router.post('/agents_transfer/listpage',agents.agents.transfer);     //代理资金信息 转账信息
router.post('/agents_bala_rebate/listpage',agents.agents.bala_rebate);  //代理资金信息 返利转余额信息
router.post('/agents_commission/listpage',agents.agents.commission);    //代理资金信息 返佣信息
router.post('/agent_rebate/listpage',agents.agents.rebate);             //代理资金信息 返利信息
router.post('/agent_rebate/dialog/listpage',agents.agents.dialogRebate);//代理资金信息 返利信息
router.post('/agents_record/listpage',agents.agents.record);            //代理沟通信息    列表
router.post('/agents_record/add',agents.agents.record_add);             //代理沟通信息    添加

/*代理合同管理*/
// router.post('/agents_contracts/listpage',agents.agentContractsList);


module.exports = router;