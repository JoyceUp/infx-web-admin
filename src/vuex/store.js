import Vue from 'vue'
import Vuex from 'vuex'
import util from '../common/js/util'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
      // env:"dev",
    env:"prd",
    userInfo:{},
    token:'',
    resources:[]
}

// 定义所需的 mutations
const mutations = {

    //保存用户
    SET_USER_INFO(state,userInfo){

        state.userInfo = userInfo || {};
        util.cookieMethod.setCookie("user",JSON.stringify(userInfo),0,"")
        sessionStorage.setItem('user', JSON.stringify(userInfo));
    },
    //保存资源树
    SET_RESOURCES(state,resources){
        state.resources = resources || []
    },
    //保存Token
    SET_TOKEN(state,token){
        state.token = token || "";
        util.cookieMethod.setCookie("token",token,0,"")
    },

}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})