import axios from 'axios';
import uitl from '../common/js/util';
let base = 'manage';
let axios_config={responseType: 'json'};

/**
 * 客户列表
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
export const potentialCustomersList = params => {
    return  axios.post(`${base}/potential_customers/listpage`, params);
}