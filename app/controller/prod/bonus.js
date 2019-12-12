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
            var buffer = Buffer.from(_res.body);
            if (_res.header["content-type"]) {
                res.setHeader('Content-Type', _res.header["content-type"]);
            }
            if (_res.header["content-disposition"]) {
                res.setHeader('content-disposition', _res.header["content-disposition"]);
            }
            res.end(buffer);
        });
}


/**
 * 业绩查询
 * **/
exports.achievement = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.achievement_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取业绩查询列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    details: function (req, res, next) {
        let {order_id} = req.body;
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.money.achievement_details + order_id)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getId', 'msg': '获取业绩查询详情'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.achievement_export;
        exportExcel(req, res, header, params, api, "导出业绩查询");
    }
};
/**
 * 返利明细
 * **/
exports.interest = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.interest_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取返利明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.interest_export;
        exportExcel(req, res, header, params, api, "导出返利明细");
    }
};
/**
 * 返佣明细
 * **/
exports.commission = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.commission_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取返佣明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.commission_export;
        exportExcel(req, res, header, params, api, "导出返佣明细");
    }
};
/**
 * 已平仓交易明细
 * **/
exports.close_position = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.close_position_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取已平仓交易明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.close_position_export;
        exportExcel(req, res, header, params, api, "导出已平仓交易明细");
    }
};
/**
 * 持仓交易明细
 * **/
exports.position = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.bonus.position_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取持仓交易明细列表'}, req);
                }
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        let api = API.money.position_export;
        exportExcel(req, res, header, params, api, "导出持仓交易明细");
    }
};