/**
 *created by cuiyajuan  date:2017-01-03
 */
let express = require("express");
let router = express.Router();
let agents = require('../../app/controller/dev/agents');
    /*登记待审核代理*/
router.post('/agents_register/listpage',agents.agentRegisterList);
    /*注册待审核列表*/
router.post('/agents_pendlist/listpage',agents.pendAgentsList);
    /*代理注册信息*/
// router.post('/agents_register/details',agents.agentRegisterDetails);
    /* 审核 （同意，拒绝） */
router.post('/agents_list/agrees',agents.updateAgrees);
router.post('/agents_list/refuses',agents.updateRefuses);
    /*潜在代理列表*/
// router.post('/agents_potential/listpage',agents.agentPotentialList);
    /*潜在代理详情*/
router.post('/agents_potential/details',agents.agentPotentialDetails);
    /*代理列表*/
// router.post('/agents/listpage',agents.agentsList);
    /*代理详情*/
// router.post('/agents/details',agents.agentDetails);
    /*代理合同管理*/
// router.post('/agents_contracts/listpage',agents.agentContractsList);

module.exports = router;