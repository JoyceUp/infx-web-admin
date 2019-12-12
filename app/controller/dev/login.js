/**
 * Created by zlp on 2017-12-10.
 */
var Mock = require('mockjs')
var userMock=require("../../mock/data/user")


//let LoginUsers=userMock.LoginUsers()
exports.signUp=function(req,res,next){

  //  var userObj = req.body;
    datas={
        token:"%5Bobject%20Object%5D"
    }
    var result={
        status:200,
        msg:'请求成功',
        datas:JSON.stringify(datas)
    }
    res.json(result)
};

exports.logout = function (_req, _res, next) {
  
};


/**
 * 同步用户信息
 * **/
let user=userMock.LoginUsers();
let resourceList = userMock.resourceData()
exports.settingInfo= function (req,res) {

    let datas = {
        user_info:user,
        resources:resourceList
    }

    let result= {
        status:200,
        msg:"请求成功",
        datas: JSON.stringify(datas)
    }

    res.json(result)
}



/**
 * 修改个人信息
 * **/
let login_user=userMock.LoginUsers();
exports.settingEdit= function (req,res) {
    let { id, nickname } = req.body;

    login_user.nickname = nickname;

    var result = {
        status: 200,
        msg: '修改成功',
        datas:""
    }
    res.json(result)
}




/**
 * 登录用户修改密码
 * **/
let _Users = userMock.adminUsers();
exports.settingPwd= function (req,res) {
    let {id, old_password, new_password} = req.body;
    _Users.some(u => {
        if (u.id === id) {
            u.old_password = old_password;
            u.new_password = new_password;

            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功',
        datas:""
    }
    res.json(result)
}


