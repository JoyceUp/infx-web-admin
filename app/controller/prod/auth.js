/**
 * Created by zlp on 2017-12-19.
 */

var request = require("superagent");
var API = require("./support/const")
var service = require("../../service/log")


exports.editLoginUsers = function (req, res, next) {

}


/**
 * 用户管理
 * **/


exports.adminUsersList = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, user_name,nickname,role_name} = req.body;
    let params = {
        "page_size": page_size || 10,
        "page_no": page_no ,
        "user_name": user_name,
        "nickname":nickname,
        "role_name":role_name
    };
    request.get(`${API.auth.user}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}

exports.addAdminUsers = function (req, res, next) {
    let _res = res;
    let _req = req;
    let {user_name, nickname, password,address, role_id, role_name} = req.body;
    let header = {
        token: _req.cookies.token
    };
    let params = {
        "user_name": user_name,
        "nickname": nickname,
        "password": password,
        "role_id": role_id,
        "address": address,
        "role_name": role_name
    };
    request.post(`${API.auth.user}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'add', 'msg': '用户' + params.user_name}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
};

exports.removeAdminUsers = function (req, res, next) {
    let {id, user_name} = req.body;
    let _req = req;
    let _res = res;
    let header = {
        token: _req.cookies.token
    };
    request.delete(`${API.auth.user}/$${id}`)
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'del', 'msg': '用户' + user_name}, _req);
            }
            _res.json(JSON.parse(res.text))
        });

};

exports.editAdminUsers = function (req, res, next) {
    let _res = res;
    let _req = req;
    let {id, user_name, nickname, password,address,role_id,role_name} = _req.body;
    let header = {
        token: _req.cookies.token
    };

    let params = {
        "id": id,
        "user_name": user_name,
        "nickname": nickname,
        "password": password,
        "role_id": role_id,
        "address": address,
        "role_name": role_name
    };
    request.put(`${API.auth.user}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '用户' + params.user_name}, _req);
            }
            _res.json(JSON.parse(res.text))
        })
};

exports.getAdminUserById = function (req, res, next) {
    let {id} = req.body;
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    request.get(`${API.auth.user}/$${id}`)
        .set(header)
        .end(function (req, res) {
            _res.json(JSON.parse(res.text))
        });
}

/**
 * 在线用户
 *
 * **/


exports.onlineAdminUsers = function (req, res, next) {
    let _res = res;
    let _req = req;
    let params = {};
    let header = {
        token: req.cookies.token
};
    request.get(`${API.auth.online}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if(res.status == 200){
                service.save_user_log({'type': 'getList', 'msg': '查询在线用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
};

exports.exitAdminUser = function (req, res, next) {
    let _res = res;
    let _req = req;
    let {user_id,user_name}=req.body;
    let params = {user_id: user_id};
    let header = {
        token: req.cookies.token
};

    request.put(`${API.auth.online}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if(res.status == 200){
                service.save_user_log({'type': 'offline', 'msg': '下线在线用户'+user_name}, _req);
            }
            _res.json(JSON.parse(res.text))
        })
};

/**
 * 获取登陆用户信息
 * update by zlp 2017.12.25 创建方法
 * @param:
 *      param.token
 * **/
/*
exports.getUserInfo = function (req,res) {
    let _res = res;
    let {token} = req.body;

    request.get(`${API.auth.online}/getUserInfo`)
        .query({msg:token})
        .end(function(req,res){

            _res.json(JSON.parse(res.text))
    })
}
*/


/**
 * 行为日志
 * **/
exports.systemLog = function (req, res, next) {
    let _res = res;
    let header = {
        token: req.cookies.token
    };
    let {page_size, page_no, order_column, order_by, condition} = req.body;
    let params = {
        "page_size": 10,
        "page_no": page_no,
        "order_column": order_column,
        "order_by": order_by,
        "condition": condition
    };
    request.get(`${API.auth.operation}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            _res.json(JSON.parse(res.text))
        });
};


exports.postLogOperation = function (req, res) {
    let _res = res;
    let header = {
        token: req.cookies.token
    };
    let {user_id, user_name, nickname, type, operation} = req.body;
    let params = {
        "user_id": user_id,
        "user_name": user_name,
        "nickname": nickname,
        "type": type,
        "operation": operation
    };
    request.post(`${API.auth.operation}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            _res.json(JSON.parse(res.text))
        });
};

/** * 比较时间 */
function CompareDate(d1, d2) {
    if (d1 != undefined && d2 != undefined) {
        return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
    }
    return true;
};


/**
 * 系统参数
 * **/



exports.systemParamList = function (req, res, next) {
    let _res = res
    let _req = req
    let {key, page_size, page_no, order_column, order_by} = req.body;
    let params = {
        "key": key,
        "page_size": 10,
        "page_no": page_no,
        "order_column": order_column,
        "order_by": order_by
    };
    let header = {
        token: req.cookies.token
    };
    request.get(`${API.auth.parameter}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询系统参数列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        })

}

exports.addystemParam = function (req, res, next) {
    let _res = res
    let _req = req
    let {key, value, status, mark} = req.body;
    let params = {
        "key": key,
        "value": value,
        "status": status,
        "mark": mark
    }
    let header = {
        token: req.cookies.token
    }
    request.post(`${API.auth.parameter}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'add', 'msg': '新增系统参数_新增' + params.key}, _req);
            }
            _res.json(JSON.parse(res.text))
        })

}

exports.removeSystemParam = function (req, res, next) {
    let _res = res
    let _req = req
    let {id, key} = req.body
    let header = {
        token: req.cookies.token
    }
    request.del(`${API.auth.parameter}/$${id}`)
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'del', 'msg': '删除的系统参数名称_' + key}, _req);
            }
            _res.json(JSON.parse(res.text))
        })

}

exports.editSystemParam = function (req, res, next) {
    let _res = res
    let _req = req
    let {id, key, value, status, mark} = req.body
  /*  let params = {
        "id": id,
        "key": key,
        "value": value,
        "status": status,
        "mark": mark
    }*/
    let params = req.body
    let header = {
        token: req.cookies.token
    }
    request.put(`${API.auth.parameter}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'edit', 'msg': '修改' + params.key}, _req);
            }
            _res.json(JSON.parse(res.text))
        })

}

/**
 * 历史记录
 * **/
exports.historyList = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: req.cookies.token
    };
    let {page_size, page_no, order_column, order_by, condition} = _req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "condition": condition
    };

    request.get(`${API.auth.history}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status == 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询历史记录列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
};

/**
 * 角色管理
 * **/

exports.roleList = function (_req, _res) {

    let header = {
        token: _req.cookies.token
    }
    let {page_size, page_no, order_column, order_by} = _req.body
    let params = {
        "page_size":page_size || 100,
        "page_no": page_no || 0,
        "order_column": order_column,
        "order_by": order_by
    }

    request.get(`${API.auth.role}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询角色列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        })

}

exports.addRole = function (_req, _res) {

    let {role, desc, status, resources} = _req.body;
    let header = {
        token: _req.cookies.token
    }
    let params = {
        "role": role,
        "desc": desc,
        "status": status,
        "resources": resources,
    };
    request.post(`${API.auth.role}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {

            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'add', 'msg': "角色" + params.role}, _req);
            }

            _res.json(JSON.parse(res.text))
        })
}

exports.removeRole = function (_req, _res) {
    let {id, role} = _req.body;
    let header = {
        token: _req.cookies.token
    }
    console.log(`${API.auth.role}/$${id}`)
    request.delete(`${API.auth.role}/$${id}`)
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if (res.status == 200) {
                service.save_user_log({'type': 'del', 'msg': "角色" + role}, _req);
            }
            _res.json(JSON.parse(res.text))
        })
}

exports.editRole = function (_req, _res) {
    let {id, role, desc, status, resources} = _req.body;
    let header = {
        token: _req.cookies.token,
    }

    let params = {
        "id": id,
      "role": role,
        "desc": desc,
        "status": status,
        "resources": resources,
    };
     request.post(`${API.auth.role_update}`)
     .send({msg: JSON.stringify(params)})
     .set("Content-Type", "application/x-www-form-urlencoded")
  /*  request.post(`${API.auth.role}`)
       .query({msg: JSON.stringify(params)})*/
     .set(header)

     .end(function (req, res) {
         //记录用户操作日志
         if (res.status == 200) {
             service.save_user_log({'type': 'edit', 'msg': "角色" + params.role}, _req);
             _res.json(JSON.parse(res.text))
         }else{
             _res.json(res)
         }

     })
}


/**
* 资源管理
* **/

exports.resourceList = function (_req, _res, next) {
    let header = {
        token: _req.cookies.token
    };
    let params = {};
    request.get(`${API.auth.resource}`)
        .set(header)
        .query({msg: JSON.stringify(params)})
        .end(function (req, res) {

            //记录用户操作日志
            if(res.status == 200){
                service.save_user_log({'type': 'getList', 'msg': '查询资源列表'}, _req);
                _res.json(JSON.parse(res.text))
            }else{
                _res.json(res)
            }


        });
}

exports.addResource = function (_req, _res, next) {
    let {name, uri, request_type, type, status, lev, parent_id, code, permission} = _req.body;

    let header = {
        token: _req.cookies.token
    };
    let params = {
        name: name,
        uri: uri,
        request_type: request_type,
        type: type,
        status: status,
        lev: lev,
        parent_id: parent_id,
        code: code,
        permission: permission
    };

    request.post(`${API.auth.resource}`)
        .set(header)
        .query({msg: JSON.stringify(params)})
        .end(function (req, res) {

            //记录用户操作日志
            if(res.status == 200){
                service.save_user_log({'type': 'add', 'msg': '资源' + params.name}, _req);
            }

            _res.json(JSON.parse(res.text))
        });
}

exports.removeResource = function (_req, _res, next) {
    let {id, name} = _req.body;
    let header = {
        token: _req.cookies.token
    };
    request.delete(`${API.auth.resource}/$${id}`)
        .set(header)
        .end(function (req, res) {
            //记录用户操作日志
            if(res.status == 200){
                service.save_user_log({'type': 'del', 'msg': "资源" + name}, _req);
            }

            _res.json(JSON.parse(res.text))
        })
}

exports.editResource = function (_req, _res, next) {
    let {id, name, uri, request_type, type, status, lev, parent_id, code, permission} = _req.body;

    let header = {
        token: _req.cookies.token
    };
    let params = {
        id: id,
        name: name,
        uri: uri,
        request_type: request_type,
        type: type,
        status: status,
        lev: lev,
        parent_id: parent_id,
        code: code,
        permission: permission
    };
    request.put(`${API.auth.resource}`)
        .set(header)
        .query({msg: JSON.stringify(params)})
        .end(function (req, res) {
            //记录用户操作日志
            if(res.status == 200){
                service.save_user_log({'type': 'edit', 'msg': "资源" + params.name}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
