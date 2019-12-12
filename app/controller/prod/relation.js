/**
 *  Created by XWang on 2017-01-03
 **/

var request = require("superagent");
var API = require("./support/const")
var service = require("../../service/log")
//客户归属变更
//客户归属变更-客户列表
exports.getCustomerList = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.customer_mngt}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询客户列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//客户归属变更-选择代理
exports.getCustomerProxyList = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.customer_mngt_ib}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询代理列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//客户归属变更-设置代理
exports.setCustomerProxy = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.put(`${API.relation.customer_mngt_set_ib}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '设置客户代理'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//客户归属变更-选择销售
exports.getCustomerSaleList = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.customer_mngt_sales}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询销售列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//客户归属变更-设置销售
exports.setCustomerSales = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.put(`${API.relation.customer_mngt_set_sales}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '设置客户销售'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};



//更新代理归属-代理列表
exports.getProxyList = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.ib_mngt}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询代理列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//更新代理归属-选择销售
exports.getProxySaleList = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.ib_mngt_sales}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '查询销售列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};
//更新代理归属-设置销售
exports.setProxySales = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.put(`${API.relation.ib_mngt_set_sales}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'edit', 'msg': '设置代理销售'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};


//变更客户归属记录
exports.getCustomerModifiedLog = function (req, res, next) {
    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.history_customer}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '获取客户关系变更历史列表'}, req);
            }
            res.json(JSON.parse(_res.text));
        });
};


//变更代理归属记录
exports.getProxyModifiedLog = function (req, res, next) {

    let header = {
        token: req.cookies.token
    };
    let params = req.body;

    request.get(`${API.relation.history_ib}`)
        .query({msg: JSON.stringify(params)})
        .set(header)
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '获取代理关系变更历史列表'}, req);
            }
            res.json(JSON.parse(_res.text))
        });
};