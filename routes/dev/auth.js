/**
 * Created by zlp on 2017-12-10.
 */



let express = require('express');
let router =  express.Router();
let login = require("../../app/controller/dev/login");
let auth = require("../../app/controller/dev/auth");

router.post("/setting/info",login.settingInfo);//同步登录用户信息
router.post("/setting/edit",login.settingEdit);//编辑
router.post("/setting/password",login.settingPwd);//修改密码

router.post("/setting/info",login.settingInfo);//同步登录用户信息
router.post("/setting/edit",login.settingEdit);//编辑
router.post("/setting/password",login.settingPwd);//修改密码

/**
 * 用户管理
 * **/

router.post("/admin_user/listpage",auth.adminUsersList);
router.post("/admin_user/add",auth.addAdminUsers);
router.post("/admin_user/remove",auth.removeAdminUsers);
router.post("/admin_user/edit",auth.editAdminUsers);
router.post("/admin_user/single",auth.getAdminUserById);
/**
 * 当前登录账户
 * **/
//router.post("/current_user/edit",auth.editLoginUsers);

/**
 * 在线用户
 * **/
router.post("/online_admin_user/listpage",auth.onlineAdminUsers);



/**
 * 行为日志
 * **/
router.post("/system_log/listpage",auth.systemLog);

/**
 * 系统参数
 * **/

router.post("/sys_param/listpage",auth.systemParamList);
router.post("/sys_param/add",auth.addystemParam);
router.post("/sys_param/remove",auth.removeSystemParam);
router.post("/sys_param/edit",auth.editSystemParam);


/**
 * 角色管理
 * **/

router.post("/role/listpage",auth.roleList);
router.post("/role/add",auth.addRole);
router.post("/role/remove",auth.removeRole);
router.post("/role/edit",auth.editRole);



/**
 * 资源管理
 * **/

router.post("/resources/listpage",auth.resourceList);
router.post("/resources/add",auth.addResource);
router.post("/resources/remove",auth.removeResource);
router.post("/resources/edit",auth.editResource);




module.exports = router;