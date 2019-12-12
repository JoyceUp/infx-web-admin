/**
 *  Created by XWang on 2017-01-03
 * */

import axios from 'axios';
let base = 'sale';

//销售列表
export const getSaleList = params => {
    return  axios.post(`${base}/list`, params);
};

//销售基本信息
export const getSaleBaseInfo = params => {
    return  axios.post(`${base}/base`, params);
};


//客户信息
export const getCustomerList = params => {
    return  axios.post(`${base}/customer`, params);
};


//代理信息
export const getProxyList = params => {
    return  axios.post(`${base}/proxy`, params);
};


//返佣返利信息
export const getRebateList = params => {
    return  axios.post(`${base}/rebate`, params);
};

//客户余额返利
export const getCustomerBalanceRebate = params => {
    return  axios.post(`${base}/customer_balance_rebate`, params);
};

//客户交易返佣
export const getCustomerTransactionRebate = params => {
    return  axios.post(`${base}/customer_transaction_rebate`, params);
};

//代理余额返利
// export const getProxyBalanceRebate = params => {
//     return  axios.post(`${base}/proxy_balance_rebate`, params);
// };


//提成信息
export const getDeductList = params => {
    return  axios.post(`${base}/deduct`, params);
};