import axios from 'axios';

let base = 'sale';


/*******************************************************销售列表*******************************************************/
export const getSaleList = params => {                              //销售列表
    return axios.post(`${base}/getSaleList`, params);
}

export const getSalerBaseInfo = params => {                         //销售基本信息
    return axios.post(`${base}/getSalerBaseInfo`, params);
}

export const getCustomerList = params => {                          //客户列表
    return axios.post(`${base}/getCustomerList`, params);
}

export const getCustomerInfor = params => {                         //客户详情
    return axios.post(`${base}/getCustomerInfor`, params);
}

export const getSalerAgentList = params => {                        //代理列表
    return axios.post(`${base}/getSalerAgentList`, params);
}

export const getSalerAgentInfor = params => {                       //代理详情
    return axios.post(`${base}/getSalerAgentInfor`, params);
}

export const getBrokerageList = params => {                         //返佣列表
    return axios.post(`${base}/getBrokerageList`, params);
}

export const getBackEarnList = params => {                          //返利列表
    return axios.post(`${base}/getBackEarnList`, params);
}

export const getBackEarnDetail = params => {                          //返利详情
    return axios.post(`${base}/getBackEarnDetail`, params);
}

export const getDeductionList = params => {                         //销售提成列表
    return axios.post(`${base}/getDeductionList`, params);
}

export const getDeductionDialogsList = params => {                   //销售提成明细
    return axios.post(`${base}/getDeductionDialogsList`, params);
}
export const getAllowanceList = params => {                          //销售津贴列表
    return axios.post(`${base}/getAllowanceList`, params);
}

export const getAllowanceDialogsList = params => {                   //销售津贴明细
    return axios.post(`${base}/getAllowanceDialogsList`, params);
}
/*******************************************************人员管理*******************************************************/
//获取人员管理列表
export const getSalesHRList = params => {
    return  axios.post(`${base}/hr/list`, params);
}
//添加销售
export const addSalesHR = params => {
    return  axios.post(`${base}/hr/add`, params);
}
//销售基本信息
export const getSalesHRInfo = params => {
    return  axios.post(`${base}/hr/info`, params);
}
//删除销售
export const removeSalesHR = params => {
    return  axios.post(`${base}/hr/remove`, params);
}
//更新销售
export const updateSalesHR = params => {
    return  axios.post(`${base}/hr/update`, params);
}
//更新销售密码
export const updatePasswordSalesHR = params => {
    return  axios.post(`${base}/hr/update_password`, params);
}



/*******************************************************机构管理*******************************************************/

/**
 * 资源列表
 * update by zlp 2017.12.19 创建方法
 * **/
export const getDepartmentList = params => {
    return  axios.post(`${base}/department/listpage`);
}



/**
 * 添加公司
 * **/
export const  addCompany = params => {
    return  axios.post(`${base}/company/add`, params);
}
/**
 * 添加部门
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.lev:
 *      params.parent_id:
 *      params.name:
 *      params.uri:
 *      params.permission:
 *      params.type:
 *      params.code:
 *      params.status:
 *
 * **/
export const addDepartment = params => {
    return  axios.post(`${base}/department/add`, params);
}

//添加组别
export const addTeam = params => {
    return  axios.post(`${base}/team/add`, params);
}


/**
 * 删除公司
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeCompany = params => {
    return  axios.post(`${base}/company/remove`, params);
}

/**
 * 删除部门
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeDepartment = params => {
    return  axios.post(`${base}/department/remove`, params);
}

/**
 * 删除组别
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeTeam = params => {
    return  axios.post(`${base}/team/remove`, params);
}

/**
 * 编辑公司
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.name:
 *      params.uri:
 *      params.permission:
 *      params.type:
 *      params.code:
 *      params.status:
 *
 * **/
export const editCompany = params => {
        return  axios.post(`${base}/company/edit`, params);
    }
/**
 * 编辑部门
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.name:
 *      params.uri:
 *      params.permission:
 *      params.type:
 *      params.code:
 *      params.status:
 *
 * **/
export const editDepartment = params => {
    return  axios.post(`${base}/department/edit`, params);
}
/**
 * 编辑组别
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.name:
 *      params.uri:
 *      params.permission:
 *      params.type:
 *      params.code:
 *      params.status:
 *
 * **/
export const editTeam = params => {
    return  axios.post(`${base}/team/edit`, params);
}


