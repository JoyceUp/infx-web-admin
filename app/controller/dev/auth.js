/**
 * Created by zlp on 2017-12-19.
 */
var Mock = require('mockjs')
var userMock = require("../../mock/data/user");





/**
 * 用户管理
 * **/

let _Users = userMock.adminUsers();

exports.adminUsersList = function (req, res, next) {
    let {page, user_name} = req.body;
    let mockUsers = _Users.filter(user => {
        if (user_name && user.user_name.indexOf(user_name) == -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    let datas ={
        total:total,
        items:mockUsers
    }
    var result={
        status: 200,
        msg: '添加成功',
        datas:JSON.stringify(datas)
    }
    res.json(result)
}

exports.addAdminUsers = function (req, res, next) {
    let {user_name, password, nickname, role_id, role_name} = req.body;
    _Users.unshift({
        id: Mock.Random.guid(),
        user_name: user_name,
        password: password,
        nickname: nickname,
        role_id: role_id
    });

    var result = {
        status: 200,
        msg: '添加成功',
        datas:''
    }
    res.json(result)
}

exports.removeAdminUsers = function (req, res, next) {

    let {id} = req.body;
    _Users = _Users.filter(u => u.id !== id);
    var result = {
        status: 200,
        msg: '删除成功',
        datas:''
    }
    res.json(result)
}

exports.editAdminUsers = function (req, res, next) {
    let {id, username, nickname, role_id, role_name, status} = req.body;
    _Users.some(u => {
        if (u.id === id) {
            u.user_name = user_name;
            u.nickname = nickname;
            u.role_id = role_id;
            u.role_name = role_name;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功',
        datas:''
    }
    res.json(result)
}


exports.getAdminUserById = function (req, _res, next) {

    var result = {
        status: 200,
        msg: '修改成功',
        datas:''
    }
    res.json(result)
}
/**
 * 在线用户
 *
 * **/

let _UsersOnline = userMock.onlineAdminUsers();

exports.onlineAdminUsers = function (req, res, next) {
    let {page, name} = req.body;
    let mockUsers = _UsersOnline.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    var result = {
        total: total,
        users: mockUsers,
    }
    res.json(result)
}

exports.exitAdminUser = function (req, res, next) {
    var result = {
        code: 200,
        msg: '强制退出成功',
    }
    res.json(result)
}







/**
 * 行为日志
 * **/

let _systemLog = userMock.systemLog();

exports.systemLog = function (req, res, next) {

    let {page_no, condition} = req.body;

    let objToStrMap = function(obj){
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k,obj[k]);
        }
        return strMap;
    }
    //string -> json
    //condition = JSON.parse(condition)

    //json -> map
    //condition = objToStrMap(condition)
    console.log(condition);
    let mockUsers = _systemLog.filter(user => {
        /*if( user.type == condition.get('type')){
            if(!(CompareDate(user.create_time,condition.get('start_time')) && CompareDate(condition.get('end_time'),user.create_time))){
                return false;
            }
            return true;
        }
        if(condition.get('type') == '' ){
            if (!(CompareDate(user.create_time, condition.get('start_time')) && CompareDate(condition.get('end_time'), user.create_time))) {
                return false;
            }
            return true;
        }*/
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    var result = {
        total: total,
        items: mockUsers,
        msg:'success'
    }
    res.json(result)
}

/** * 比较时间 */
function CompareDate(d1,d2)
{
    if(d1 != undefined && d2 != undefined && d1 != '' && d2 != ''){
        return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
    }
    return true;
}


/**
 * 系统参数
 * **/

let systemParam = userMock.systemParam();

exports.systemParamList = function (req, res, next) {
    let {page_no, name} = req.body;
    let mockUsers = systemParam.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total:total,
        items:mockUsers
    }
    var result = {
      status: 200,

      msg: '请求成功',
      datas: JSON.stringify(datas)
    }
    res.json(result)
}

exports.addystemParam = function (req, res, next) {
    let {key, value, data_type, status, mark} = req.body;
    systemParam.unshift({
        id: Mock.Random.guid(),
        key: key,
        value: value,
        create_time: Mock.Random.date('yyyy-MM-dd'),
        status: status,
        mark: mark,
    });
    var result = {
        status: 200,
        msg: '添加成功',
    }
    res.json(result)
}

exports.removeSystemParam = function (req, res, next) {
    let {id} = req.body
    systemParam = systemParam.filter(u => u.id !== id);
    var result = {
        status: 200,
        msg: '删除成功'
    }
    res.json(result)
}

exports.editSystemParam = function (req, res, next) {
    let {id, key, value, data_type, status, mark} = req.body;
    systemParam.some(u => {
        if (u.id === id) {
            u.key = key;
            u.value = value;
            u.status = status;
            u.mark = mark;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功'
    }
    res.json(result)
}





/**
 * 角色管理
 * **/

let roleData = userMock.roleData();


exports.roleListAll = function (req, res, next) {
    let total = roleData.length
    var result = {
        total: total,
        role_list: roleData,
    }
    res.json(result)
}


exports.roleList = function (req, res, next) {
    let {page,} = req.body;
    let mockUsers = roleData
    let total = mockUsers.length;
    if(page){

        mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
    }else{
        mockUsers = mockUsers
    }
    datas = {
        total: total,
        items: mockUsers,
    }

    var result = {
        status: 200,
        datas: JSON.stringify(datas),
    }
    res.json(result)
}

exports.addRole = function (req, res, next) {
    let {id, role, desc, status, resources} = req.body;
    roleData.unshift({
        id: Mock.Random.guid(),
        role: role,
        desc: desc,
        status: status,
        resources: resources,
    });
    var result = {
        status: 200,
        msg: '添加成功',
    }
    res.json(result)
}

exports.removeRole = function (req, res, next) {

    let {id} = req.body;
    roleData = roleData.filter(u => u.id !== id);
    var result = {
        status: 200,
        msg: '删除成功',
    }
    res.json(result)
}

exports.editRole = function (req, res, next) {
    let {id, role, desc, status, resources} = req.body;
    roleData.some(u => {
        if (u.id === id) {
            u.role = role;
            u.desc = desc;
            u.status = status;
            u.resources = resources;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '修改成功',
    }
    res.json(result)
}




/**
 * 资源管理
 * **/

let resourceData = userMock.resourceData();

exports.resourceList = function (req, res, next) {
    let {page} = req.body;

    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(resourceData),
    }
    res.json(result)
}

exports.addResource = function (req, res, next) {

    let {name, uri, request_type, type, status, lev, parent_id, code, permission} = req.body;
    let addNode = {
        id: Mock.Random.guid(),
        name: name,
        uri: uri,
        request_type: request_type,
        type: type,
        status: status,
        lev: lev,
        parent_id: parent_id,
        code: code,
        permission: permission,
        children: []
    };
    if (parent_id == "") {
        resourceData.push(addNode);

    } else {
        resourceData.some(u => {
            if (u.children.length > 0) {
                u.children.some(n => {
                    if (n.id === parent_id) {
                        n.children.push(addNode);

                    }
                })
            }
            if (u.id === parent_id) {
                u.children.push(addNode);

            }
        });
    }

    var result = {
        status: 200,
        msg: '添加成功',
        datas: JSON.stringify({'id':addNode.id}),
    };

    res.json(result)
}

exports.removeResource = function (req, res, next) {
    let {id} = req.body;
    resourceData = resourceData.filter(u => u.id !== id);
    resourceData.some(m => {
        m.children = m.children.filter(m => m.id !== id)
        m.children.some(n => {
            n.children = n.children.filter(n => n.id !== id)
        })
    });

    var result = {
        status: 200,
        msg: '删除成功',
    };
    res.json(result)
}

exports.editResource = function (req, res, next) {
    let {id, name, uri, request_type, type, status, lev, parent_id, code, permission} = req.body;
    resourceData.some(u => {
        if (u.id === id) {
            u.name = name;
            u.uri = uri;
            u.request_type = request_type;
            u.type = type;
            u.status = status;
            u.lev = lev;
            u.parent_id = parent_id;
            u.code = code;
            u.permission = permission;
            return true;
        }
    });


    resourceData.some(u => {
        if (u.children.length > 0) {
            u.children.some(n => {
                if (n.children.length > 0) {
                    n.children.some(m => {
                        if (m.id === id) {
                            m.name = name;
                            m.uri = uri;
                            u.request_type = request_type;
                            m.type = type;
                            m.status = status;
                            m.lev = lev;
                            m.parent_id = parent_id;
                            m.code = code;
                            m.permission = permission;
                            return true;
                        }
                    })
                }

                if (n.id === id) {
                    n.name = name;
                    n.uri = uri;
                    n.request_type = request_type;
                    n.type = type;
                    n.status = status;
                    n.lev = lev;
                    n.parent_id = parent_id;
                    n.code = code;
                    n.permission = permission;
                    return true;
                }
            })
        }
        if (u.id === id) {
            u.name = name;
            u.uri = uri;
            u.request_type = request_type;
            u.type = type;
            u.status = status;
            u.lev = lev;
            u.parent_id = parent_id;
            u.code = code;
            u.permission = permission;
            return true;
        }

    });

    var result = {
        status: 200,
        msg: '修改成功',
    };
    res.json(result)
}
