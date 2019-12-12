import axios from 'axios';

let base = 'bonus';

/**
 * 获取业绩列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementList = params => {
    return axios.post(`${base}/achievement/list`, params);
};
/**
 * 业绩详情
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementDetails = params => {
    return axios.post(`${base}/achievement/details`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const achievementExport = params => {
    return axios.post(`${base}/achievement/export`, params);
};

/**
 * 返利明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const interestList = params => {
    return axios.post(`${base}/interest/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const interestExport = params => {
    return axios.post(`${base}/interest/export`, params);
};

/**
 * 返佣明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const commissionList = params => {
    return axios.post(`${base}/commission/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const commissionExport = params => {
    return axios.post(`${base}/commission/export`, params);
};

/**
 * 已平仓交易明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const closePositionList = params => {
    return axios.post(`${base}/close_position/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const closePositionExport = params => {
    return axios.post(`${base}/close_position/export`, params);
};

/**
 * 持仓交易明细列表
 * update by szt 2018.03.13 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const positionList = params => {
    return axios.post(`${base}/position/list`, params);
};
/**
 * 导出数据
 * update by szt 2018.03.13 创建方法
 * @params
 *      id
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const positionExport = params => {
    return axios.post(`${base}/position/export`, params);
};
