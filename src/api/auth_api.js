import axios from 'axios';
import uitl from '../common/js/util';
let base = 'auth';
let axios_config={responseType: 'json'};



/**
 * 同步登录用户信息
 * update by zlp 2017.12.25 创建方法
 * @params
 *
 * @return
 *      status
 *      msg
 *      datas
 *          user_info
 *          resources
 * **/
export const settingSync = params => {

    return  axios.post(`${base}/setting/info`, params);
}




/**--------管理员用户管理--------**/

/**
 * 管理员用户列表
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.page:第几页
 *
 *
 * **/
export const getAdminUserList = params => {
    return  axios.post(`${base}/admin_user/listpage`, params);
}

/**
 * 新增管理员用户
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.username:
 *      params.password:
 *      params.nickname:
 *      params.status:
 *      params.role_id: 角色ID
 *      params.role_name: 角色名字
 *
 * **/
export const addAdminUser = params => {
    return  axios.post(`${base}/admin_user/add`, params);
}

/**
 * 删除管理员用户
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeAdminUser = params => {
    return  axios.post(`${base}/admin_user/remove`, params);
}

/**
 * 编辑管理员用户
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.username:
 *      params.password:
 *      params.nickname:
 *      params.status:
 *      params.role_id: 角色ID
 *      params.role_name: 角色名字
 * **/
export const editAdminUser = params => {
    return  axios.post(`${base}/admin_user/edit`, params);
}

/**
 * 获取单个管理员用户
 * update by zlp 2018.01.02 创建方法
 * @params
 *      params.id:
 */
export const getAdminUserById =  params => {
    return axios.post(`${base}/admin_user/single`,params);
}


/**--------在线用户--------**/

/**
 * 在线用户列表
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.page:第几页
 *
 * **/
export const getOnlineAdminUserList = params => {
    return  axios.post(`${base}/online_admin_user/listpage`, params);
}




/**
 * 强制退出
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const exitAdminUser = params => {
    return  axios.post(`${base}/online_admin_user/exit`, params);
}





/**--------行为日志--------**/

/**
 * 行为日志列表
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.page:第几页
 *      params.type: 行为筛选
 *      params.start_date 开始时间
 *      params.end_date   结束时间
 *
 * **/
export const getSystemLogList = params => {
    return  axios.post(`${base}/system_log/listpage`, params);
}



/**--------系统参数--------**/

/**
 * 系统参数列表
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.page:第几页
 *
 * **/
export const getSysParamList = params => {
    return  axios.post(`${base}/sys_param/listpage`, params);
}

/**
 * 新增系统参数
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.key:   参数名
 *      params.value: 参数值
 *      params.data_type:  数据类型
 *      params.status:     状态
 *      params.mark:     备注
 *
 *
 * **/
export const addSysParam = params => {
    return  axios.post(`${base}/sys_param/add`, params);
}

/**
 * 删除系统参数
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeSysParam = params => {
    return  axios.post(`${base}/sys_param/remove`, params);
}


/**
 * 编辑系统参数
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.key:   参数名
 *      params.value: 参数值
 *      params.data_type:  数据类型
 *      params.status:     状态
 *      params.mark:     备注
 * **/
export const editSysParam = params => {
    return  axios.post(`${base}/sys_param/edit`, params);
}


/**--------个人设置--------**/
/**
 * 编辑系统参数
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.username:
 *      params.nickname:
 *      params.old_password:
 *      params.new_password:
 * **/
export const editCurrentUser = params => {
    return  axios.post(`${base}/setting/edit`, params);
}

export const editCurrentPassword = params => {
    return  axios.post(`${base}/setting/password`, params);
}




/**--------资源管理--------**/

/**
 * 资源列表
 * update by zlp 2017.12.19 创建方法
 * **/
export const getResourcesList = params => {
    return  axios.post(`${base}/resources/listpage`);
}

/**
 * 添加资源
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
export const addResources = params => {
    return  axios.post(`${base}/resources/add`, params);
}

/**
 * 删除管理员用户
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * **/
export const removeResources = params => {
    return  axios.post(`${base}/resources/remove`, params);
}

/**
 * 编辑资源
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
export const editResources = params => {
    return  axios.post(`${base}/resources/edit`, params);
}




/**--------角色管理--------**/

/**
 * 角色列表
 * update by zlp 2017.12.19 创建方法
 *   @params
 *      params.page:第几页
 *  @return
 *      total
 *      role_list[]
 * **/
export const getRoleList = params => {
    return  axios.post(`${base}/role/listpage`, params);
}

/**
 * 添加角色
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.role:
 *      params.description:
 *      params.status:
 *      params.resources: ID的数组
 * @return
 *      code        200
 *      message
 * **/
export const addRole = params => {
    return  axios.post(`${base}/role/add`, params);
}

/**
 * 删除角色
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *
 * @return
 *      code        200
 *      message
 * **/
export const removeRole = params => {
    return  axios.post(`${base}/role/remove`, params);
}

/**
 * 编辑角色
 * update by zlp 2017.12.19 创建方法
 * @params
 *      params.id:
 *      params.role:
 *      params.description:
 *      params.status:
 *      params.resources: ID的数组
 *
 * @return
 *      code        200
 *      message
 * **/
export const editRole = params => {
    return  axios.post(`${base}/role/edit`, params);
}


/**--------历史记录--------**/

/**
 * 历史记录列表
 * update by zlp 2017.12.19 创建方法
 *   @params
 *      params.page:第几页
 *  @return
 *      total
 * **/
export const getHistoryRecordList = params => {
    return  axios.post(`${base}/history_record/listpage`, params);
};
