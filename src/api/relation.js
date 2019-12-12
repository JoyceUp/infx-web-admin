
import axios from 'axios';
let base = 'relation';

//客户归属变更
//客户归属变更-客户列表
export const getCustomerList = params => {
    return  axios.post(`${base}/customer_list`, params);
};
//客户归属变更-选择代理
export const getCustomerProxyList = params => {
    return  axios.post(`${base}/customer_proxy_list`, params);
};
export const setCustomerProxy = params => {
    return  axios.post(`${base}/set_customer_proxy`, params);
};
//客户归属变更-选择销售
export const getCustomerSaleList = params => {
    return  axios.post(`${base}/customer_sale_list`, params);
};
export const setCustomerSales = params => {
    return  axios.post(`${base}/set_customer_sales`, params);
};

//更新代理归属
//更新代理归属-代理列表
export const getProxyList = params => {
    return  axios.post(`${base}/proxy_list`, params);
};
//更新代理归属-选择销售
export const getProxySaleList = params => {
    return  axios.post(`${base}/proxy_sale_list`, params);
};
export const setProxySales = params => {
    return  axios.post(`${base}/set_proxy_sales`, params);
};


//变更客户归属记录
export const getCustomerModifiedLog = params => {
    return  axios.post(`${base}/customer_modified`, params);
};

//变更代理归属记录
export const getProxyModifiedLog = params => {
    return  axios.post(`${base}/proxy_modified`, params);
};