import axios from 'axios';
import uitl from '../common/js/util';
let base = 'manage';
let axios_config={responseType: 'json'};

/**
 * 登记待审核代理
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.agent_name:'',//姓名
 *   params.email:'',//电子邮箱
 *   params.identityNo:'',//证件号码
 *   params.status:'',//状态
 *   params.start_date:'',//登记开始时间
 *   params.end_date:''//登记结束时间
 * @returns list
 */
export const agentRegisterList = params => {
    return  axios.post(`${base}/agents_register/listpage`, params);
};
/**
 * 登记待审核代理 -- 详情
 * @param params
 *   params.apply_ib_id  代理登记的id
 * @returns info
 */
export const agentRegisterInfo = params => {
    return  axios.post(`${base}/agents_register/info`, params);
};
/**
 * 登记待审核代理 -- 同意（重发）
 * @param params
 *   params.apply_ib_id  代理登记的id
 * @returns info
 */
export const agentRegisterAgree = params => {
    return  axios.post(`${base}/agents_register/agrees`, params);
};
/**
 * 登记待审核代理 -- 拒绝
 * @param params
 *   params.apply_ib_id  代理登记的id
 * @returns info
 */
export const agentRegisterRefuses = params => {
    return  axios.post(`${base}/agents_register/refuses`, params);
};

/**
 * 注册待审核列表
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.agent_name:'',//代理姓名
 *   params.email:'',//电子邮箱
 *   params.mobile:'',//手机号码
 *   params.identityNo:'',//证件号码
 *   params.status:'',//状态
 *   params.start_date:'',//注册开始时间
 *   params.end_date:''//注册结束时间
 * @returns list
 */
export const pendAgentsList = params => {
    return  axios.post(`${base}/agents_pendlist/listpage`, params);
};
/**
 * 注册待审核列表 -- 同意（重发）
 * @param params
 *   params.potential_ib_id
 * @returns info
 */
export const pendAgentsAgree = params => {
    return  axios.post(`${base}/agents_pendlist/agrees`, params);
};
/**
 * 注册待审核列表 -- 拒绝
 * @param params
 *   params.potential_ib_id
 * @returns info
 */
export const pendAgentsRefuses = params => {
    return  axios.post(`${base}/agents_pendlist/refuses`, params);
};

// /**
//  * 同意 or 重发  登记待审核
//  * update by zlp 2017.12.19 创建方法
//  * @params
//  *      params.link:
//  *      params.state:
//  *      params.id: 登记ID
//  *
//  * **/
// export const agreeAgent = params => {
//     return  axios.post(`${base}/agents_list/agrees`, params);
// }
//
// /**
//  * 拒绝  登记待审核
//  * update by zlp 2017.12.19 创建方法
//  * @params
//  *      params.mark:
//  *      params.state:
//  *      params.id: 角色ID
//  *
//  * **/
// export const refuseAgent = params => {
//     return  axios.post(`${base}/agents_list/refuses`, params);
// }

/**
 * 代理注册信息
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.id:'',
 * @returns list
 */
export const agentPendDetails = params => {
    return  axios.post(`${base}/agents_pendlist/details`, params);
}

/**
 * 潜在代理列表
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.start_date:'',//更新开始时间
 *   params.end_date:''//更新结束时间
 * @returns list
 */
export const agentPotentialList = params => {
    return  axios.post(`${base}/agents_potential/listpage`, params);
};

/**
 * 潜在代理详情
 * @param params
 *   params.potential_ib_id 潜在代理的id
 * @returns info
 */
export const agentPotentialInfo = params => {
    return  axios.post(`${base}/agents_potential/info`, params);
};

/**
 * 代理列表
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.agent_no:代理账号
 *   params.agent_name//代理姓名
 *   params.email://电子邮箱
 *   params.mobile://手机号码
 *   params.identityNo://证件号码
 *   params.identityNo://销售编号
 *   params.identityNo://销售姓名
 *   params.status:'',//代理状态
 *   params.start_date:'',//注册开始时间
 *   params.end_date:''//注册结束时间
 * @returns list
 */
export const agentList = params => {
    return  axios.post(`${base}/agents/listpage`, params);
};

/**
 * 代理详情
 * @param params
 *   params.ib_id
 * @returns info
 */
export const getAgentInfo = params =>{
    return axios.post(`${base}/agents/info`,params);
};

/**
 * 代理详情 => 用户信息  更新
 * @param params
 * @params.family_name: 姓
 * @params.given_name   名
 * @params.call         称呼
 * @params.date_of_birth 出生日期
 * @params.email        电子邮箱
 * @params.mobile       手机号码
 * @params.identity_type 证件类型
 * @params.Identity_no   证件号码
 * @returns list
 */
export const updateAgentInfo = params =>{
    return axios.post(`${base}/agents/info/update`,params);
};

/**
 * 代理详情 =>用户信息  删除
 * @param params
 * @params.id
 * @params.email        电子邮箱
 * @returns list
 */
export const removeAgentInfo = params =>{
    return axios.post(`${base}/agents/info/remove`,params);
}

/**
 * 代理详情 =>银行信息
 * @param params
 * @params.ib_id
 * @returns list
 */
export const agentBankcardList = params =>{
    return axios.post(`${base}/agents_bankcard/listpage`,params);
};

/**
 * 代理详情 =>电汇信息
 * @param params
 * @params.id
 * @returns list
 */
export const agentTtList = params =>{
    return axios.post(`${base}/agents_tt/listpage`,params);
};

/**
 * 代理详情 =>账户信息
 * @param params
 * @params.id
 * @returns list
 */
export const agentAccountlist = params =>{
    return axios.post(`${base}/agents_account/listpage`,params);
};
/**
 * 代理详情 => 账户信息  启用
 * @param account_id 账户的id
 * @returns update
 */
export const updaEnableAccountInfo = params =>{
    return axios.post(`${base}/agents_account/enable`,params);
};
/**
 * 代理详情 => 账户信息  禁用
 * @param account_id 账户的id
 * @returns update
 */
export const updaDisableAccountInfo = params =>{
    return axios.post(`${base}/agents_account/disable`,params);
};
/**
 * 代理详情 => 账户信息  删除
 * @param account_id 账户的id
 * @returns update
 */
export const updaDeleteAccountInfo = params =>{
    return axios.post(`${base}/agents_account/delete`,params);
};
/**
 * 代理详情 => 账户信息  重发开户邮件
 * @param account_id 账户的id
 * @returns update
 */
export const updaResend_emailAccountInfo = params =>{
    return axios.post(`${base}/agents_account/resend_email`,params);
};

/**
 * 代理详情 =>客户信息
 * @param params
 * @params.id
 * @returns list
 */
export const agentCustomerList = params =>{
    return axios.post(`${base}/agents_customer/listpage`,params);
}

/**
 * 代理详情 =>资金信息 => 出入金记录
 * @param params
 * @params.id
 * @returns list
 */
export const agentDepDrawList = params =>{
    return axios.post(`${base}/agents_dep_draw/listpage`,params);
};

/**
 * 代理详情 =>资金信息 => 转账记录
 * @param params
 * @params.id
 * @returns list
 */
export const agentTransferList = params =>{
    return axios.post(`${base}/agents_transfer/listpage`,params);
};

/**
 * 代理详情 =>资金信息 => 返利转余额记录
 * @param params
 * @params.id
 * @returns list
 */
export const agentBalaRebateList = params =>{
    return axios.post(`${base}/agents_bala_rebate/listpage`,params);
};

/**
 * 代理详情 =>资金信息 => 交易返佣记录
 * @param params
 * @params.id
 * @returns list
 */
export const agentCommissionList = params =>{
    return axios.post(`${base}/agents_commission/listpage`,params);
};

/**
 * 代理详情 =>资金信息 => 余额返利列表
 * @param params
 * @params.id
 * @returns list
 */
export const agentRebateList = params =>{
    return axios.post(`${base}/agent_rebate/listpage`,params);
};
export const agentRebateDialogList = params =>{
    return axios.post(`${base}/agent_rebate/dialog/listpage`,params);
};

/**
 * 代理详情 =>沟通信息
 * @param params
 * @params.id
 * @returns list
 */
export const agentRecordList = params =>{
    return axios.post(`${base}/agents_record/listpage`,params);
};
/**
 * 代理详情 =>沟通信息 添加
 * @param params
 * @params.id
 * @returns list
 */
export const addRecordList = params =>{
    return axios.post(`${base}/agents_record/add`,params);
};