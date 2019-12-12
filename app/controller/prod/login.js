/**
 * Created by zlp on 2017-12-10.
 */
//var Promise = require("bluebird");
var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");


exports.signUp = function (req, res, next) {
    let _res = res;
    let {user_name, password} = req.body;
    let params = {
        user_name: user_name,
        password: password
    };
    request.post(API.login.login)
        .query({msg: JSON.stringify(params)})
        .end(function (req, res) {
          if(res.status == 200){
              _res.json(JSON.parse(res.text))
          }else{
              _res.json(res)
          }

        });

};

exports.logout = function (_req, _res, next) {

    let header = {
        token: _req.cookies.token
    }

   service.save_user_log({'type': 'loginOut', 'msg': '用户退出登录'}, _req);
    request.post(API.login.logout)
        .set(header)
        .end(function (req, res) {
            _res.json(JSON.parse(res.text))
        });

};

/**
 * 同步用户信息
 * **/
exports.settingInfo= function (_req,_res) {

    let header = {
        token: _req.cookies.token
    }

    request.get( `${API.login.setting}/info` )
        .set(header)
        .end(function(req,res){
                if(res.text){

                    let text =JSON.parse(res.text)
                    if (text.status == 200 && text.datas) {
                        let datas = JSON.parse(text.datas)
                        let user= datas.user_info
                        let param = {
                            'type': 'login',
                            'msg': '用户登录',
                            'id':user.id,
                            'user_name':user.user_name,
                            'nickname':user.nickname,
                        }
                        service.save_user_login(param, _req);
                    }

                }


            _res.json(JSON.parse(res.text))
        })
}



/**
 * 修改个人信息
 * **/
exports.settingEdit= function (req,res) {
    let _res = res;
    let _req = req;
    let { id , nickname} = req.body;
    let params = {
        id:id,
        nickname:nickname
    };
    let header = {
        token:req.cookies.token,
        request_type:API.request_types.PUT
    }
    request.put( `${API.login.setting}` )
        .query({msg:JSON.stringify(params)})
        .set(header)
        .end(function(req,res){
            if (res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '修改个人信息'}, _req);
            }
            _res.json(JSON.parse(res.text))
        })
}



/**
 * 登录用户修改密码
 * **/
exports.settingPwd = function (req, res) {
    let _res = res;
    let _req = req;
    let {id, old_password, con_password} = req.body;
    let header = {
        token: req.cookies.token
    };
    let params = {
        id: id,
        old_password: old_password,
        new_password: con_password
    };
    request.put(`${API.login.setting}/password`)
        .set(header)
        .query({msg: JSON.stringify(params)})
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '登录用户修改密码'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}


