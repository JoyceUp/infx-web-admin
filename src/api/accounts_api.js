import axios from 'axios';
let base ='accounts';

//客户账号列表
export const accountsList = params =>{
    return  axios.post(`${base}/accounts/list`,params);
};

//账号明细
export const accountDetail = params =>{
    return axios.post(`${base}/accounts/info`,params);
}

//更新账号
export const enableAccount = params =>{
    return axios.post(`${base}/accounts/enable`,params);
}

export const getDepositList = params =>{
    return axios.post(`${base}/accounts/deposit/list`,params);
}

//客户账号导出
export const exportCustomer = params =>{
    return axios.post(`${base}/accounts/customer/export`,params, {responseType: 'arraybuffer'});
}


//代理账号 列表
export const agentAccountList = params =>{
    return axios.post(`${base}/accounts/agent/list`,params);
}
//账号明细
export const agentAccountDetail = params =>{
    return axios.post(`${base}/accounts/agent/info`,params);
}

//代理账号导出
export const exportAgent = params =>{
    return axios.post(`${base}/accounts/agent/export`,params);
}

//#待审核列表
export const reviewsList = params =>{
    return  axios.post(`${base}/pending/accounts/list`,params);
};

//#待审核列表   账号明细
export const reviewDetail = params =>{
    return axios.post(`${base}/pending/accounts/info`,params);
}

//#待审核列表   文件审核
export const openAccountByFile = params =>{
    return axios.post(`${base}/pending/accounts/file/open`,params);
}
//#待审核列表   开通账号
export const openAccount = params =>{
    return axios.post(`${base}/pending/accounts/open`,params);
}

//#待审核列表   拒绝
export const rejectAccount = params =>{
    return axios.post(`${base}/pending/accounts/reject`,params);
}

// export const getDepositList = params =>{
//     return axios.post(`${base}/pending/accounts/deposit/list`,params);
// }

//#待审核列表   导出
export const exportReview = params =>{
    return axios.post(`${base}/pending/accounts/customer/export`,params, {responseType: 'arraybuffer'});
}
