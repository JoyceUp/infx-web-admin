/**
 * author:cuiyajuam
 * created date :2018-01-24
 */

var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");

//#潜在用户列表
exports.potentials = {
    list : function (req, res, next) {
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
        request.get(`${API.customers.potential_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if(res.status ){

                    if (res.status == 200) {
                        service.save_user_log({'type': 'getList', 'msg': '潜在用户列表'}, _req);
                    }
                    _res.json(JSON.parse(res.text))
                }

        });
    },
    info : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "id": id
        };

        request.get(`${API.customers.potential_info}/$${id}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '潜在用户详情'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    }
};

//#注册用户
exports.customers = {
    list : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {

                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册用户列表'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    info : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "customer_id": id
        };

        request.get(`${API.customers.customer_info}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '注册用户详情'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    address_info : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {id} = _req.body;
        let params = {
            "customer_id": id
        };

        request.get(`${API.customers.customer_address}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status == 200) {
                    service.save_user_log({'type': 'getId', 'msg': '注册列表详情的基础地址信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    update : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        request.put(`${API.customers.customer_update_basic}`)
            .query({msg: JSON.stringify(_req.body)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户列表的详情更新基本信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    remove : function (_req, _res, next) {

        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "customer_id": id
        };

        request.delete(`${API.customers.customer_info_remove}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'del', 'msg': '注册客户列表的详情删除基本信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    bankcard : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {id} = _req.body;
        let params = {
          "customer_id":id
        };

        request.get(`${API.customers.customer_info_bankcard }`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 银行卡信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    tel_transfer_list : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {customer_id} = _req.body;
        let params = {
            "customer_id":customer_id
        };
        request.get(`${API.customers.customer_tel_transfer_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 电汇信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    tel_transfer_info : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {id} = _req.body;
        let params = {
            "customer_id":id
        };

        request.get(`${API.customers.customer_tel_transfer_info }`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 电汇信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    // 返佣信息
    rebate_commission : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let customer_id = _req.body.condition.customer_id;
        let params = {
            condition:{customer_id:customer_id }
        };
        request.get(`${API.customers.customer_commission}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户返佣信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    // 余额返利信息
    balance_rebate : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let customer_id = _req.body.condition.customer_id;
        let params = {
            condition:{"customer_id":customer_id }
            // "customer_id":id
        };
        request.get(`${API.customers.customer_balance_rebate}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '余额返利信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    // 余额返利信息明细
    rebate_detail : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let start_time = _req.body.condition.start_time;
        let customer_id = _req.body.condition.customer_id;
        let params = {
            condition:{
                start_time:start_time,
                customer_id:customer_id
            }
            // "customer_id":id
        };

        console.log(params.condition)
        request.get(`${API.customers.customer_rebate_detail }`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '余额返利信息明细'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    // 返利转余额
    detail_to_rebate : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let customer_id = _req.body.condition.customer_id;
        let params = {
            condition:{"customer_id":customer_id }
            // "customer_id":id
        };
        request.get(`${API.customers.customer_detail_to_rebate }`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '返利转余额'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    // 下级信息
    relation_children : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {customer_id} = _req.body;
        let params = {
            condition:{customer_id:customer_id}
        };
        request.get(`${API.customers.customer_relation_children }`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户下级信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
};
//注册客户账户信息
exports.account = {
    list : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        request.get(`${API.customers.customer_list}/account`)
            .query({msg: JSON.stringify(_req.body)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 账户信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    enable : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "account_id": id
        };

        request.put(`${API.customers.customer_list}/account/enable`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息激活操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    disable : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "account_id": id
        };
        request.put(`${API.customers.customer_list}/account/disable`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息禁用操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    delete : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id, customer_id} = _req.body;
        let params = {
            "account_id": id,
            "customer_id": customer_id
        };
        request.put(`${API.customers.customer_list}/account/delete`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息删除操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    resend_email : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "account_id": id
        };
        request.put(`${API.customers.customer_list}/account/resend_email`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息重发开户邮件操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    set_read_only : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "account_id": id
        };

        request.put(`${API.customers.customer_list}/account/set_read_only`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息只读操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    update_password : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "account_id": id
        };
        request.put(`${API.customers.customer_list}/account/update_password`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册客户详情 -- 账户信息重置交易密码操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
};
//注册客户 - 客户详情 - 资金信息
exports.fund = {
    //出入金信息
    deposit_withdraw : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}/fund/deposit_withdraw`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 资金信息（出金信息）'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //转账信息
    transfer : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}/fund/transfer`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 资金信息（转账信息）'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //余额清零信息
    clear_balance : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}/fund/clear_balance`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 资金信息（余额清零信息）'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //交易信息
    trade : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}/fund/trade`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 资金信息（交易信息）'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },

};

//关系管理
exports.relation = {
    list : function (req, res, next) {
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

        request.get(`${API.customers.customer_list}/relation`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 关系信息'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
};

//注册客户 - 沟通记录
exports.record = {
    list : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };
        let {page_size, page_no, order_column, order_by, customer_id} = _req.body;
        let params = {
            "page_size": page_size,
            "page_no": page_no,
            "order_column": order_column,
            "order_by": order_by,
            "customer_id": customer_id
        };

        request.get(`${API.customers.customer_list}/record/${customer_id}`)
            // .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 沟通记录'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    add : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id, recorder_type, recorder_id, recorder_full_name, content} = req.body;
        let params = {
            "customer_id": id,
            "recorder_type": recorder_type,
            "recorder_id": recorder_id,
            "recorder_full_name": recorder_full_name,
            "content": content
        };

        request.post(`${API.customers.customer_list}/record`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '注册客户详情 -- 沟通记录添加操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    }
};

