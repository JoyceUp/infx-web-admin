import * as API from "../api/auth_api"

/**
 * 获取并保存登录用户信息
 * **/
export  const save_user_info = ({commit},user_info) =>{
    return new Promise((resolve, reject) => {
        commit("SET_USER_INFO", user_info);
        resolve()
    });
};


/**
 * 获取并保存登录用户信息
 * **/
export  const setting_Sync = ({commit},{token}) =>{
    return new Promise((resolve, reject) => {

        API.settingSync({token}).then( res => {

            if(res.data.status == 200){
                let data = JSON.parse(res.data.datas)
                let user_info=data.user_info;
                let resources=data.resources;
                commit("SET_USER_INFO", user_info);
                commit("SET_RESOURCES", resources);

            }else{
                //this.$message(res.data.msg);
            }
            resolve(res)

/*
            if(data.status == 200){
                let user_info=data.user_info;
                let resources=data.resources;
                commit("SET_USER_INFO", user_info);
                commit("SET_RESOURCES", resources);
                resolve()
            }else{
                this.$message.error(data.status + " : "+data.msg);
            }*/
        })
    });
};

/**
 * 保存token
 * **/
export  const set_token= ({commit},{token}) =>{
    return new Promise((resolve, reject) => {
        commit("SET_TOKEN", token)
        resolve()
    })

};