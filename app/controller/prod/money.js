/**
 * Created by zlp on 2017-12-19.
 */
var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");

//导出excel通用方法，
function exportExcel(req, res, header, params, api, type) {
    request.get(api)
        .set(header)
        .responseType("blob")
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '导出' + type + '列表'}, req);
            }

            //导出型api, 返回文件流，在_res.body中, 而不在_res.text中
            //_res.body有可能是文件内容，也可能是错误信息
            if (_res.header["content-type"]) {
                res.setHeader('Content-Type', _res.header["content-type"]);
            }
            if (_res.header["content-disposition"]) {
                res.setHeader('content-disposition', _res.header["content-disposition"]);
            }
            res.end(_res.body);
        });
}


/**
 * 入金
 * **/
exports.deposit = {
    depositList: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.deposit_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取入金列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    depositDetails: function (req, res, next) {
        let {order_id} = req.body;
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.deposit_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取入金详情'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    confirmDeposit: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.deposit_confirm)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '入金-确认到账'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    ignoreDeposit: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        request.put(API.money.deposit_ignore)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '入金-忽略订单'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    increaseDeposit: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        request.put(API.money.deposit_increase)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '入金-同意入账'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    manualIncreaseDeposit: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        request.put(API.money.deposit_manual_increase)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '入金-手动处理入账'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    exportDeposit: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.deposit_export;
        exportExcel(req, res, header, params, api, "入金");
    }
};

/**
 * 出金
 * **/
exports.withdraw = {

    withdrawList: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.withdraw_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取出金列表'}, req);
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }

            });
    },

    withdrawDetails: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {order_id} = req.body;
        let params = req.body;
        request.get(API.money.withdraw_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取出金详情'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    decreaseWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.withdraw_decrease)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '出金-扣款'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    finishWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.withdraw_finish)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '出金-给银行打款'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    ignoreWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.withdraw_ignore)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '出金-忽略订单'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    manualDecreaseWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.withdraw_manual_decrease)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '出金-手动扣款'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    backWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log(JSON.stringify(params))
        request.put(API.money.withdraw_back)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '出金-退回订单'}, req);
                }
                console.log(_res.text)
                res.json(JSON.parse(_res.text))
            });
    },
    exportWithdraw: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.money.withdraw_export;
        exportExcel(req, res, header, params, api, "出金");
    },
    exportWithdrawIDR: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        let api = API.money.withdraw_export_idr;
        exportExcel(req, res, header, params, api, "印尼盾提款");


    },
    exportWithdrawUSD: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        let api = API.money.withdraw_export_usd;
        exportExcel(req, res, header, params, api, "美金提款");


    }
};

/**
 * 转账管理
 * **/
exports.transfer = {

    transferList: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.transfer_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取转账列表'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },

    transferDetails: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {order_id} = req.body;
        let params = req.body;
        request.get(API.money.transfer_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取转账详情'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    transferTransfer: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.transfer_transfer)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '转账-转账'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    manualTransferTransfer: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.transfer_manual_transfer)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '转账-手动转账'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    ignoreTransfer: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.transfer_ignore)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '转账-忽略订单'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    exportTransfer: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        let api = API.money.transfer_export;
        exportExcel(req, res, header, params, api, "转账");

    }

};

/**
 * 余额清零
 * **/
exports.clearBalance = {

    clearBalanceList: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.clear_balance_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取余额清零列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    clearBalanceDetails: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {order_id} = req.body;
        let params = req.body;
        request.get(API.money.clear_balance_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取余额清零详情'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    clearClearBalance: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.clear_balance_clear)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '余额清零-余额清零'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    ignoreClearBalance: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.clear_balance_ignore)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '余额清零-忽略订单'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    manualClearClearBalance: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.put(API.money.clear_balance_manual_clear)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'edit', 'msg': '余额清零-手动余额清零'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    exportClearBalance: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.money.clear_balance_export;
        exportExcel(req, res, header, params, api, "余额清零");
    }
}

/**
 * 返利管理
 * **/
exports.rebate = {
    //a返利明细列表
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
        request.get(`${API.money.rebate_list}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status == 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                    _res.json(JSON.parse(res.text))
                }else{
                    _res.json(res)
                }

            });
    },
    //b获取当天的返利明细
    one_day : function (req, res, next) {
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
        request.get(`${API.money.one_day}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //b获取当天的返利明细导出
    export_one_day : function (req, res, next) {
        let header = {
            token: req.cookies.token
        };

        let {rebate_date, account_no, rebate_status, role} = req.body;
        let params = {
            "rebate_date": rebate_date,
            "account_no": account_no,
            "rebate_status": rebate_status,
            "role": role
        };
        exportExcel(req, res, header, params, API.money.export_one_day, "获取当天的返利明细导出");
    },
    //b财务打返利操作
    confirm_one_day : function (req, res, next) {
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
        request.put(`${API.money.confirm_one_day}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //b重新生成当天为生成的返利明细
    repeat_one_day : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {rebate_date} = req.body;
        let params = {
            "rebate_date": rebate_date,
        };
        request.put(`${API.money.repeat_one_day}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },

    //c获取客户返利明细列表
    one_day_info_list : function (req, res, next) {
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
        request.get(`${API.money.one_day_info_list2}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //c统计
    one_day_info_list_summary : function (req, res, next) {
        let _res = res;
        let _req = req;
        let header = {
            token: _req.cookies.token
        };

        let {condition} = req.body;
        let params =  condition;
        request.get(`${API.money.export_one_day_summary}`)
            .query({msg: JSON.stringify(params)})
            .set(header)
            .end(function (req, res) {
                if (res.status === 200) {
                    // service.save_user_log({'type': 'agentRegisterList', 'msg': '登记待审核代理'}, _req);
                }
                _res.json(JSON.parse(res.text))
            });
    },
    //c获取客户返利明细列表导出
    export_one_day_info_list : function (req, res, next) {
        let header = {
            token: req.cookies.token
        };

        let {parent_account, rebate_date, account_no, role} = req.body;
        let params = {
            parent_account: parent_account,
            rebate_date: rebate_date,
            account_no: account_no,
            role: role
        };
        exportExcel(req, res, header, params, API.money.export_one_day_info_list2, "获取客户返利明细列表导出");
    }
};
/**
 * 返利转余额
 * **/
exports.rebateToBalance = {

    rebateToBalanceList: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.rebate_to_balance_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取返利列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    rebateToBalanceDetails: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {order_id} = req.body;
        let params = req.body;
        request.get(API.money.rebate_to_balance_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取返利详情'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },

    rebateToBalanceExport: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.money.rebate_to_balance_export;
        exportExcel(req, res, header, params, api, "返利");
    }
};

/**
 * 补算
 * **/
exports.rebateLost = {
    //返佣补算
    commission: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.post(API.money.process_lost_commission)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '返佣补算'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //提成补算
    reward: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.post(API.money.process_lost_reward)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '提成补算'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    }
};

/**
 * 跨系统内部转账
 * **/
exports.internalTransferOfSystem = {
    //获取账户信息
    account_info: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {account_from, account_to} = req.body;
        let params = {
            account: account_from
        };
        //step1 获取老系统用户信息
        request.get(API.money.pre_transfer_pre_custinfo)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '跨系统内部转账-获取老系统账户信息'}, req);
                }
                let old_custom_info = JSON.parse(_res.text);
                if (old_custom_info.status == 200){
                    //step2 获取新系统用户信息
                    params = {
                        account: account_to
                    };
                    request.get(API.money.pre_transfer_custinfo)
                        .set(header)
                        .query({msg: JSON.stringify(params)})
                        .end(function (_req, _res) {
                            if (_res.status === 200) {
                                service.save_user_log({'type': 'getList', 'msg': '跨系统内部转账-获取新系统账户信息'}, req);
                            }
                            let new_custom_info = JSON.parse(_res.text);
                            if (new_custom_info.status == 200){
                                let result = {
                                    status: 200,
                                    new: new_custom_info,
                                    old: old_custom_info
                                };
                                res.json(result);
                            }else{
                                res.json(new_custom_info);
                            }
                        });
                }else{
                    res.json(old_custom_info);
                }
            });
    },
    //转出
    out: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {account, amount} = req.body;
        let params = {
            account: account,
            amount: amount
        };
        request.put(API.money.pre_transfer_pre_withdraw)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '跨系统内部转账-转出'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    //转入
    in: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let {account, amount} = req.body;
        let params = {
            account: account,
            amount: amount
        };
        request.put(API.money.pre_transfer_deposit)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '跨系统内部转账-转入'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    }
};

