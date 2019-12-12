/**
 * Created by zlp on 2017-12-19.
 */

var request = require("superagent");
var API = require("./support/const")
var service = require("../../service/log")
/**
 * 销售管理
 */
//销售列表
exports.getSaleList = function (req, res) {

    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {pageSize, currentPage, sale_name,sales_account_no,sale_mobile,sale_email,sale_status} = req.body;
    let params = {
        "page_size": pageSize,
        "page_no": currentPage,
        "order_column": "gmt_create",
        "order_by": "desc",
        "condition":{
            "sales_account_no": sales_account_no,
            "full_name": sale_name,
            "mobile": sale_mobile,
            "email": sale_email,
            "state": sale_status,
            }

    };

    request.get(`${API.sales.sale.list}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '销售列表'}, _req);
                _res.json(JSON.parse(res.text))
            }else{
                _res.json(res)
            }

        });
};

//获取销售基本信息
exports.getSalerBaseInfo = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {sale_id} = req.body;
    let params = {
        sales_id:sale_id
    };

    request.get(`${API.sales.sale.info}`)
        .query({msg:JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {

            if (res.status === 200) {
                service.save_user_log({'type': 'getId', 'msg': '查询销售基本信息'+sale_id}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
};

//获取客户信息列表
exports.getCustomerList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {pageSize, currentPage, sale_id} = req.body;
    let params = {
        "page_size": pageSize,
        "page_no": currentPage,
        "condition":{
            "sales_id": sale_id
        }

    };
    request.get(`${API.sales.sale.customer}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
};

//获取销售代理列表
exports.getSalerAgentList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {pageSize, currentPage, sale_id} = req.body;
    let params = {
        "page_size": pageSize,
        "page_no": currentPage,
        "condition":{
            "sales_id": sale_id
        }

    };
    request.get(`${API.sales.sale.ib}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}


//获取销售返佣列表
exports.getBrokerageList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, sale_id} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "order_column":"order_time",
        "order_by": "desc",
        "condition":{
            "sales_id": sale_id
        }

    };
    request.get(`${API.sales.sale.commission}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取销售返利列表
exports.getBackEarnList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, sale_id} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "condition":{
            "sales_id": sale_id
        }

    };
    request.get(`${API.sales.sale.rebate}/oneday`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取返利详情
exports.getBackEarnDetail= function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, start_time,sales_id} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "condition":{
            "start_time": start_time,
            "sales_id":sales_id
        }

    };
    request.get(`${API.sales.sale.rebate}/detail`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取销售提成列表
exports.getDeductionList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
/*    let {page_size, page_no, sale_id} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "condition":{
            "sales_id": sale_id
        }

    };
    console.log(params);*/
    request.get(`${API.sales.sale.reward}`)
        .query({msg: JSON.stringify(req.body)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '销售提成列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取销售提成明细
exports.getDeductionDialogsList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, order_column, order_by, condition} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "order_column": order_column,
        "order_by": order_by,
        "condition": condition

    };
    request.get(`${API.sales.sale.reward_info}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '销售提成明细'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取销售津贴列表
exports.getAllowanceList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, order_column, order_by, condition} = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "order_column": order_column,
        "order_by": order_by,
        "condition": condition

    };
    request.get(`${API.sales.sale.allowance}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '销售津贴列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取销售津贴列表
exports.getAllowanceDialogsList = function (req, res) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_size, page_no, order_column, order_by, condition } = req.body;
    let params = {
        "page_size": page_size,
        "page_no": page_no,
        "order_column": order_column,
        "order_by": order_by,
        "condition": condition
    };
    request.get(`${API.sales.sale.allowance_info}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '销售津贴明细'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
/**
 * 资源管理
 * **/

//获取组织机构树
exports.departmentList = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    request.get(`${API.sales.organization.list}`)
        .query({})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询用户列表'}, _req);
                _res.json(JSON.parse(res.text))
            }else{
                _res.json(res.text)
            }

        });
}

//添加公司
exports.addCompany = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {name} = req.body;
    let params = {
        "company_name": name,
    };
    request.post(`${API.sales.organization.company}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '添加公司'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });

}
//添加部门
exports.addDepartment = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {name,company_id} = req.body;
    let params = {
        "department_name": name,
        "company_id":company_id,
    };
    request.post(`${API.sales.organization.department}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '添加部门'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });

}
//添加组别
exports.addTeam = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {company_id,department_id,name} = req.body;
    let params = {
        "team_name": name,
        "company_id":company_id,
        "department_id":department_id
    };
    request.post(`${API.sales.organization.team}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '添加组别'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });

}

//删除公司
exports.removeCompany = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {id} = req.body;
    let params = {
        "company_id": id,
    };
    request.delete(`${API.sales.organization.company}/$${id}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '删除公司'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//删除部门
exports.removeDepartment = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {id} = req.body;
    let params = {
        "id": id,
    };
    request.delete(`${API.sales.organization.department}/$${id}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '删除部门'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//删除组别
exports.removeTeam = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {id} = req.body;
    let params = {
        "id": id,
    };

    request.delete(`${API.sales.organization.team}/$${id}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '删除组别'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//编辑公司
exports.editCompany = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {name,id} = req.body;
    let params = {
        "company_name": name,
        "id":id,
    };
    request.put(`${API.sales.organization.company}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '编辑公司'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//编辑部门
exports.editDepartment = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {name,id} = req.body;
    let params = {
        "department_name": name,
        "id":id
    };
    request.put(`${API.sales.organization.department}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '编辑部门'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//编辑组别
exports.editTeam = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {name,id} = req.body;
    let params = {
        "team_name": name,
        "id":id
    };
    request.put(`${API.sales.organization.team}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '编辑组别'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}

/**
 * 人员管理
 * **/

//获取人员管理列表
exports.personnelList = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let {page_no,pageSize,sales_account_no ,full_name, mobile, email, sales_state,company,department,team,position} = req.body;
    let params = {
        "page_no": page_no,
        "page_size": pageSize,
        "order_column": "gmt_create",
        "order_by": "desc",
        "condition":{
            "sales_account_no": sales_account_no,
            "full_name": full_name,
            "mobile": mobile,
            "email": email,
            "sales_state": sales_state,
            "sales_organization":[{
                "company_id" : company,
                "department_id" : department,
                "team_id"   :team,
                "position" :position
                }
            ]
        }

    };

    request.get(`${API.sales.hr.list}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '获取人员管理列表'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
// 新增销售
exports.addPersonnel = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    //let {full_name,given_name,identity_type,identity_no,gender,date_of_birth, mobile, email, sales_state,remark,company,department,team,position} = req.body;
    // let params = {
    //         "employee_no": employee_no,
    //         "full_name": full_name,
    //         "mobile": mobile,
    //         "email": email,
    //         "sales_state": sales_state,
    //         "sales_organization":[{
    //             "company_id" : company,
    //             "department_id" : department,
    //             "team_id"   :team,
    //             "position" :position
    //             }
    //         ]
    //     }


    request.post(`${API.sales.hr.add}`)
        .query({msg: JSON.stringify(req.body)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '新增销售'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//获取单个销售信息
exports.personnelSingle = function (req, res, next) {
    let _res = res;
    let _req = req;
    let {id} = req.body;
    let header = {
        token: _req.cookies.token
    };
    let params = {
        id : id
    }

    request.get(`${API.sales.hr.info}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '获取单个销售信息'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}

//删除销售
exports.delPersonnel = function (req, res, next) {
    let _res = res;
    let _req = req;
    let {id} = req.body;
    let header = {
        token: _req.cookies.token
    };
    let params = {
        id : id
    }

    request.delete(`${API.sales.hr.remove}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '删除销售'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//更新销售
exports.updatePersonnel = function (req, res, next) {
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };

    request.put(`${API.sales.hr.update}`)
        .query({msg: JSON.stringify(req.body)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '更新销售'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
//更新销售密码
exports.updatePassWordPersonnel = function (req, res, next) {
    let {id} = req.body;
    let _res = res;
    let _req = req;
    let header = {
        token: _req.cookies.token
    };
    let params = {
        id : id,
        // password:password
    }

    request.put(`${API.sales.hr.update_password}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (req, res) {
            if (res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '更新销售密码'}, _req);
            }
            _res.json(JSON.parse(res.text))
        });
}
