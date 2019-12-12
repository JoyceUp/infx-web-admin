import axios from 'axios';

let base = 'money';

/**
 * 获取入金列表
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositList = params => {
    return axios.post(`${base}/deposit/list`, params);
};
/**
 * 入金详情
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositDetails = params => {
    return axios.post(`${base}/deposit/details`, params);
};
/**
 * 财务处理
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositConfirm = params => {
    return axios.post(`${base}/deposit/confirm`, params);
};
/**
 * 财务或资金岗忽略订单
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositIgnore = params => {
    return axios.post(`${base}/deposit/ignore`, params);
};
/**
 * 资金岗同意资金入账
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositIncrease = params => {
    return axios.post(`${base}/deposit/increase`, params);
};
/**
 * 资金岗手动处理入账后变更状态为已完成
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositManualIncrease = params => {
    return axios.post(`${base}/deposit/manual_increase`, params);
};
/**
 * 导出数据
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const depositExport = params => {
    return axios.post(`${base}/deposit/export`, params, {responseType: 'arraybuffer'});
};


/**
 * 获取出金列表
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawList = params => {
    return axios.post(`${base}/withdraw/list`, params);
};
/**
 * 出金详情
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawDetails = params => {
    return axios.post(`${base}/withdraw/details`, params);
};
/**
 * 资金岗扣款
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawDecrease = params => {
    return axios.post(`${base}/withdraw/decrease`, params);
};
/**
 * 财务给银行打款完成
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawFinish = params => {
    return axios.post(`${base}/withdraw/finish`, params);
};
/**
 * 资金岗忽略订单
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawIgnore = params => {
    return axios.post(`${base}/withdraw/ignore`, params);
};
/**
 * 资金岗手动扣款
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawManualDecrease = params => {
    return axios.post(`${base}/withdraw/manual_decrease`, params);
};
/**
 * 资金退回订单
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawBack = params => {
    return axios.post(`${base}/withdraw/back`, params);
};
/**
 * 导出数据
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const withdrawExport = params => {
    return axios.post(`${base}/withdraw/export`, params, {responseType: 'arraybuffer'});
};
export const withdrawExportUSD = params => {
    return axios.post(`${base}/withdraw/export_usd`, params, {responseType: 'arraybuffer'});
};
export const withdrawExportIDR = params => {
    return axios.post(`${base}/withdraw/export_idr`, params, {responseType: 'arraybuffer'});
};


/**
 * 获取转账列表
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferList = params => {
    return axios.post(`${base}/transfer/list`, params);
};
/**
 * 转账详情
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferDetails = params => {
    return axios.post(`${base}/transfer/details`, params);
};
/**
 * 资金岗忽略转账订单
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferIgnore = params => {
    return axios.post(`${base}/transfer/ignore`, params);
};
/**
 * 资金岗手动完成转账
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferManualTransfer = params => {
    return axios.post(`${base}/transfer/manual_transfer`, params);
};
/**
 * 资金岗完成转账
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferTransfer = params => {
    return axios.post(`${base}/transfer/transfer`, params);
};
/**
 * 导出数据
 * update by szt 2018.01.03 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const transferExport = params => {
    return axios.post(`${base}/transfer/export`, params, {responseType: 'arraybuffer'});
};


/**
 * 余额清零列表
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceList = params => {
    return axios.post(`${base}/clear_balance/list`, params);
};
/**
 * 余额清零详情
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceDetails = params => {
    return axios.post(`${base}/clear_balance/details`, params);
};
/**
 * 资金岗完成余额清零
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceClear = params => {
    return axios.post(`${base}/clear_balance/clear`, params);
};
/**
 * 资金岗忽略订单
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceIgnore = params => {
    return axios.post(`${base}/clear_balance/ignore`, params);
};
/**
 * 资金岗手动完成余额清零
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceManualClear = params => {
    return axios.post(`${base}/clear_balance/manual_clear`, params);
};
/**
 * 导出数据
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const clearBalanceExport = params => {
    return axios.post(`${base}/clear_balance/export`, params, {responseType: 'arraybuffer'});
};

/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateList = params => {
    return axios.post(`${base}/rebate/list`, params);
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateOneDay = params => {
    return axios.post(`${base}/rebate/one_day`, params);
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateExportOneDay = params => {
    return axios.post(`${base}/rebate/export_one_day`, params, {responseType: 'arraybuffer'});
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateConfirmOneDay = params => {
    return axios.post(`${base}/rebate/confirm_one_day`, params);
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateRepeatOneDay = params => {
    return axios.post(`${base}/rebate/repeat_one_day`, params);
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateOneDayInfoList = params => {
    return axios.post(`${base}/rebate/one_day_info_list`, params);
};
/**
 * 返利列表统计
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateOneDayInfoListSummary = params => {
    return axios.post(`${base}/rebate/one_day_info_list_summary`, params);
};
/**
 * 返利列表
 * update by szt 2018.01.31 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateExportOneDayInfoList = params => {
    return axios.post(`${base}/rebate/export_one_day_info_list`, params, {responseType: 'arraybuffer'});
};

/**
 * 返利转余额列表
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const rebateToBalanceList = params => {
    return axios.post(`${base}/rebate_to_balance/list`, params);
};
/**
 * 返利转余额详情
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const rebateToBalanceDetails = params => {
    return axios.post(`${base}/rebate_to_balance/details`, params);
};
/**
 * 导出数据
 * update by szt 2018.01.03 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const rebateToBalanceExport = params => {
    return axios.post(`${base}/rebate_to_balance/export`, params, {responseType: 'arraybuffer'});
};

/**
 * 返佣补算
 * update by szt 2018.03.02 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateLostCommission = params => {
    return axios.post(`${base}/rebate_lost/process_lost_commission`, params);
};

/**
 * 提成补算
 * update by szt 2018.03.20 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const rebateLostReward = params => {
    return axios.post(`${base}/rebate_lost/process_lost_reward`, params);
};

/**
 * 跨系统内部转账-获取账户信息
 * update by szt 2018.03.19 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const internalTransferOfSystemAccountInfo = params => {
    return axios.post(`${base}/internal_transfer_of_system/account_info`, params);
};

/**
 * 跨系统内部转账-转出
 * update by szt 2018.03.19 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const internalTransferOfSystemOut = params => {
    return axios.post(`${base}/internal_transfer_of_system/out`, params);
};
/**
 * 跨系统内部转账-转入
 * update by szt 2018.03.19 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 * **/
export const internalTransferOfSystemIn = params => {
    return axios.post(`${base}/internal_transfer_of_system/in`, params);
};