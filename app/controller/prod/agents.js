/**
 * author:cuiyajuan
 * created date :2018-01-03
 */


var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");

//登记待审核代理
exports.agentRegister = {
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
        request.get(`${API.agents.apply_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
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
            "apply_ib_id": id
        };
        request.get(`${API.agents.apply_list}/info`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '登记待审核代理详情'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    agre : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "apply_ib_id": id
        };
        request.put(`${API.agents.apply_list}/agree`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '登记待审核代理同意操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    refu : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id,remark} = req.body;
        let params = {
            "apply_ib_id": id,
            "remark": remark
        };
        request.put(`${API.agents.apply_list}/reject`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '登记待审核代理拒绝操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    }
};


/*注册待审核列表*/
exports.pendAgents = {
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
        request.get(`${API.agents.potential_list}/registed`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    _res.json(JSON.parse(res.text))
                    service.save_user_log({'type': 'getList', 'msg': '注册待审核列表'}, _req);
                }else{
                    _res.json(res)
                }

            });
    },
    agre : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "potential_ib_id": id
        };

        request.put(`${API.agents.potential_list}/agree`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册待审核同意操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    refu : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id,remark} = req.body;
        let params = {
            "potential_ib_id": id,
            "remark": remark
        };
        request.put(`${API.agents.potential_list}/reject`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '注册待审核拒绝操作'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    }
};

//#潜在代理
exports.agentPotential = {
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
        request.get(`${API.agents.potential_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '潜在代理查询列表'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
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
            "potential_ib_id": id
        };
        request.get(`${API.agents.potential_list}/info`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '潜在代理详情'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
};


//#代理列表
exports.agents = {
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
        request.get(`${API.agents.ib_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理列表'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
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
            "ib_id": id
        };

        request.get(`${API.agents.ib_info}/basic`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '代理列表详情'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    update : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id, family_name, given_name, gender, date_of_birth, email, identity_type, identity_no,identity1_path,identity2_path} = _req.body;//, identity1_path, identity2_path
        let params = {
            "ib_id": id,
            "family_name": family_name,
            "given_name": given_name,
            "gender": gender,
            "date_of_birth": date_of_birth,
            "email": email,
            "identity_type": identity_type,
            "identity_no": identity_no,
            "identity1_path": identity1_path,
            "identity2_path": identity2_path
        };
        request.put(`${API.agents.ib_info}/update_basic`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '代理详情更新'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    remove : function (_req, _res, next) {
        let header = {
            token: _req.cookies.token
        };

        let {id} = _req.body;
        let params = {
            "ib_id": id
        };

        request.delete(`${API.agents.ib_info}/remove`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'del', 'msg': '代理详情删除'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    bankcard : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };
        let {id} = req.body;
        let params = {
            "ib_id": id
        };

        request.get(`${API.agents.ib_info}/bankcard`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--银行信息'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    tt : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };
        let {id} = req.body;
        let params = {
            "ib_id": id
        };
        request.get(`${API.agents.ib_info}/tel_transfer`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--电汇信息'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    account : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };
        let {condition, page_size, page_no} = req.body;
        let params = {
            "condition": condition,
            "page_size": page_size,
            "page_no": page_no,
        };

        request.get(`${API.agents.account_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                     service.save_user_log({'type': 'getList', 'msg': '代理详情的账户信息'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    enable : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "account_id": id
        };
        request.put(`${API.agents.account_list}/enable`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '代理详情--账户信息操作激活'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    disable : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "account_id": id
        };

        request.put(`${API.agents.account_list}/disable`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '代理详情--账户信息操作禁止'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    delete : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id, ib_id} = req.body;
        let params = {
            "account_id": id,
            "ib_id": ib_id
        };
        request.put(`${API.agents.account_list}/delete`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '代理详情--账户信息操作删除'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    resend_email : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id} = req.body;
        let params = {
            "account_id": id
        };
        request.put(`${API.agents.account_list}/resend_email`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '代理详情--账户信息操作重发开户邮件'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },

    customer : function (req, res, next) {
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
        request.get(`${API.agents.customer_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--客户信息'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    dep_draw : function (req, res, next) {
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
        request.get(`${API.agents.deposit_withdraw_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--出金记录'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
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
        request.get(`${API.agents.transfer_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--转账记录'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    bala_rebate : function (req, res, next) {
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
        request.get(`${API.agents.rebate_balance_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--返利转余额列表'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    commission : function (req, res, next) {
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
        request.get(`${API.agents.commission_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--交易返佣列表'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    rebate : function (req, res, next) {
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
        request.get(`${API.agents.rebate_list}/oneday`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--交易返利列表'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    dialogRebate : function (req, res, next) {
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
        request.get(`${API.agents.rebate_list}/detail`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--余额返利明细'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    record : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };
        // let {page_size, page_no, order_column, order_by, condition} = req.body;
        let {condition} = req.body;
        let params = {
            "page_size": 10,
            "page_no": 1,
            "order_column": "",
            "order_by": "",
            "condition": condition
        };
        request.get(`${API.agents.record_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--沟通信息'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    record_add : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {id, recorder_type, recorder_id, recorder_full_name, content} = req.body;
        let params = {
            "ib_id": id,
            "recorder_type": recorder_type,
            "recorder_id": recorder_id,
            "recorder_full_name": recorder_full_name,
            "content": content
        };

        request.post(`${API.agents.record_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '代理详情--沟通信息添加'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },


};