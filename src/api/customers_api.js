import axios from 'axios';
import uitl from '../common/js/util';
let base = 'customers';
let axios_config={responseType: 'json'};

/**
 * 潜在客户列表
 * @param params
 *   params.page_size:每页行数
 *   params.page_no:第几页
 *   params.mt4_account:'',//mt4号
 *   params.customer_name:'',//客户姓名
 *   params.email:'',//点子邮箱
 *   params.phone_number:'',//手机号码
 *   params.identityNo:'',//证件号码
 *   params.agent_id:'',//代理ID
 *   params.agent_name:'',//代理姓名
 *   params.sale_id:'',//销售ID
 *   params.sale_name:'',//销售姓名
 *   params.status:'',//状态
 *   params.start_date:'',//注册开始时间
 *   params.end_date:''//注册结束时间
 * @returns list
 */
export const potentialsList = params => {
    return  axios.post(`${base}/potentials/listpage`, params);
};

export const potentialsInfo = params =>{
    return axios.post(`${base}/potentials/info`,params);
};

//#注册客户
export const customersList = params => {
    return  axios.post(`${base}/customers/listpage`, params);
};

export const customersInfo = params =>{
    return axios.post(`${base}/customers/info`,params);
};

export const customersAddressInfo = params =>{
    return axios.post(`${base}/customers/info/address`,params);
};

export const updateCustomer = params =>{
    return axios.post(`${base}/customers/info/update`,params);
};

export const removeCustomer = params =>{
    return axios.post(`${base}/customers/info/remove`,params);
};

export const customerBankcardList = params => {
    return  axios.post(`${base}/customers/info/bankcard`, params);      //注册客户银行信息
};
export const customerTel_transferList = params => {
    return  axios.post(`${base}/customers/info/tel_transfer_list`, params);   //注册客户电汇列表
};
export const customerTel_transferInfo = params => {
    return  axios.post(`${base}/customers/info/tel_transfer_info`, params);   //注册客户电汇详情
};

export const customerAccountList = params => {
    return  axios.post(`${base}/customers/account`, params);   //注册客户账户信息
};
export const updateEnableCustomer = params =>{
    return axios.post(`${base}/customers/account/enable`,params);  //激活账户
};
export const updateDisableCustomer = params =>{
    return axios.post(`${base}/customers/account/disable`,params);  //禁用账户
};
export const updateDeleteCustomer = params =>{
    return axios.post(`${base}/customers/account/delete`,params);  //删除账户
};
export const updateResend_emailCustomer = params =>{
    return axios.post(`${base}/customers/account/resend_email`,params);  //重发开户邮件
};
export const updateSet_read_onlyCustomer = params =>{
    return axios.post(`${base}/customers/account/set_read_only`,params);  //改账户状态为只读
};
export const update_passwordCustomer = params =>{
    return axios.post(`${base}/customers/account/update_password`,params);  //重置交易密码
};


export const deposit_withdrawCustomersList = params => {
    return  axios.post(`${base}/customers/fund/deposit_withdraw`, params);  //注册客户资金信息出入金信息
};
export const transferCustomersList = params => {
    return  axios.post(`${base}/customers/fund/transfer`, params);  //注册客户资金信息转账信息
};
export const clear_balanceCustomersList = params => {
    return  axios.post(`${base}/customers/fund/clear_balance`, params);  //注册客户资金信息余额清零信息
};
export const tradeCustomersList = params => {
    return  axios.post(`${base}/customers/fund/trade`, params);  //注册客户资金信息交易信息
};

export const agentCommissionList = params =>{
    return axios.post(`${base}/customers/fund/rebate_commission`,params);  // 注册客户返佣列表
};
export const balanceRebate = params =>{
    return axios.post(`${base}/customers/fund/balance_rebate`,params);  // 注册客户余额返利
};
export const rebateDetail = params =>{
    return axios.post(`${base}/customers/fund/rebate_detail`,params);  // 注册客户余额返利明细
};
export const rebateToBalance = params =>{
    return axios.post(`${base}/customers/fund/detail_to_rebate`,params);  // 注册客户返利转余额
};
export const relationCustomersChildren = params =>{
    return axios.post(`${base}/customers/fund/relation_children`,params);  // 注册客户下级信息
};



//关系管理
export const relationCustomersList = params => {
    return  axios.post(`${base}/customers/relation`, params);  //列表
};

export const recordCustomersList = params => {
    return  axios.post(`${base}/customers/record`, params);  //注册客户沟通记录列表
};
export const addRecordCustomers = params => {
    return  axios.post(`${base}/customers/record/add`, params);  //注册客户沟通记录添加
};
