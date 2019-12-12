/**
 * Created by XWang on 2018-03-21.
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
            console.log("导出 _res.status",_res.status);
            console.log("导出 _res.body",_res.body);
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '导出' + type + '报表'}, req);
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
 * 入金
 * **/
exports.deposit = {
    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        console.log("token",req.cookies.token);
        let params = req.body;
        console.log("params",params);
        request.get(API.report.deposit_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取入金报表'}, req);
                }
                console.log("_res.text",_res.text);
                res.json(JSON.parse(_res.text))
            });
    },
    export: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };

        let api = API.report.deposit_export;
        exportExcel(req, res, header, params, api, "入金");
    },
    export_sales: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        console.log("销售每日入金 params",params);
        let api = API.report.deposit_sales_export;
        exportExcel(req, res, header, params, api, "销售每日入金");
    },
    export_team: function (req, res, next) {
        let params = req.body;
        let header = {
            token: req.cookies.token
        };
        console.log("团队每日净入金 params",params);
        let api = API.report.deposit_team_export;
        exportExcel(req, res, header, params, api, "团队每日净入金");
    },
};

/**
 * 出金
 * **/
exports.withdraw = {

    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log("出金 params",params);
        request.get(API.report.withdraw_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                console.log("出金 _res.text",_res.text);
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取出金报表'}, req);
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }

            });
    },
    export: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log("出金 params",params);
        let api = API.report.withdraw_export;
        exportExcel(req, res, header, params, api, "出金");
    }
};


/**
 * 转账管理
 * **/
exports.transfer = {

    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log("转账 params",params);
        request.get(API.report.transfer_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                console.log("转账 _res.text",_res.text);
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取转账报表'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    export: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        console.log("转账 params",params);
        let api = API.report.transfer_export;
        exportExcel(req, res, header, params, api, "转账");

    }

};


/**
 * 出入金汇总
 * **/
exports.sum = {

    list: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        console.log("出入金汇总 params",params);
        request.get(API.report.sum_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                console.log("出入金汇总 _res.text",_res.text);
                if (_res.status === 200) {
                    service.save_user_log({'type': 'getList', 'msg': '获取出入金汇总报表'}, req);
                }
                res.json(JSON.parse(_res.text));
            });
    },
    export: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        console.log("出入金汇总 params",params);
        let api = API.report.sum_export;
        exportExcel(req, res, header, params, api, "出入金汇总");

    }

};

/**
 * 每日账户余额表
 * **/
exports.balance = {

    export: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;

        console.log("每日账户余额表 params",params);
        let api = API.report.balance_export;
        exportExcel(req, res, header, params, api, "每日账户余额");

    }

};

