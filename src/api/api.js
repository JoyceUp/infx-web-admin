import axios from 'axios';

let base = 'login';

export const requestLogin = params => {  return axios.post(`${base}/signup`, params).then(res => res.data); };
export const logout = params => {  return axios.post(`${base}/logout`, params).then(res => res.data); };
