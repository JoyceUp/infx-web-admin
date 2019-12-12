import axios from 'axios';
import uitl from '../common/js/util';
let base = 'common';
let axios_config = {responseType: 'json'};



/**
 * 上传图片
 * @params file
 * @params roleType
 * @params roleId
 * @return
 *      status
 *      msg
 *      datas
 *          id
 * **/
export const update_img = params => {

    return  axios.post(`${base}/upload`, params);
};
