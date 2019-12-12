/**
 * Created by XWang 2018.03.21.
 */

import axios from 'axios';

let base = 'report';

/**
 * 获取入金流量表
 * **/
export const depositList = params => {
    return axios.post(`${base}/deposit/list`, params);
};
/**
 * 导出入金流量表
 * **/
export const depositExport = params => {
    return axios.post(`${base}/deposit/export`, params);
};


/**
 * 获取出金流量表
 * **/
export const withdrawList = params => {
    return axios.post(`${base}/withdraw/list`, params);
};
/**
 * 导出出金流量表
 * **/
export const withdrawExport = params => {
    return axios.post(`${base}/withdraw/export`, params);
};


/**
 * 获取转账流量表
 * **/
export const transferList = params => {
    return axios.post(`${base}/transfer/list`, params);
};
/**
 * 导出转账流量表
 * **/
export const transferExport = params => {
    return axios.post(`${base}/transfer/export`, params);
};

/**
 * 获取出入金汇总表
 * **/
export const sumList = params => {
    return axios.post(`${base}/sum/list`, params);
};
/**
 * 导出出入金汇总表
 * **/
export const sumExport = params => {
    return axios.post(`${base}/sum/export`, params);
};

/**
 * 导出每日账户余额表
 * **/
export const balanceExport = params => {
    return axios.post(`${base}/balance/export`, params);
};

/**
 * 导出出入金汇总表
 * **/
export const depositSalesExport = params => {
    return axios.post(`${base}/deposit_sales/export`, params);
};

/**
 * 导出出入金汇总表
 * **/
export const depositTeamExport = params => {
    return axios.post(`${base}/deposit_team/export`, params);
};
