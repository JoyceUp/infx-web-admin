/**
 *  Created by XWang on 2017-01-03
 **/

var Mock = require('mockjs')
var relationMock = require("../../mock/data/relation");

//客户归属变更
//同代理账号关系变更-客户列表
exports.getCustomerList = function (req, res) {

    let items = [{
        customer_id: 'C00001',
        customer_name: '张飞',
        customer_mobile: '18744452222',
        customer_email: 'zhf@mdf.com',
        customer_credentials: '452322198202212420',
        customer_status: '正常',
        proxy_id: 'D001',
        proxy_name: '代理甲',
        sale_id: '10000',
        sale_name: '销售1'
    }, {
        customer_id: 'C00002',
        customer_name: '李逵',
        customer_mobile: '15134785896',
        customer_email: 'lq@mdf.com',
        customer_credentials: '412828198811052037',
        customer_status: '正常',
        proxy_id: 'D001',
        proxy_name: '代理甲',
        sale_id: '10000',
        sale_name: '销售1'
    }, {
        customer_id: 'C00003',
        customer_name: '李鬼',
        customer_mobile: '12345678910',
        customer_email: 'lg@mdf.com',
        customer_credentials: '412828198811052038',
        customer_status: '正常',
        proxy_id: 'D001',
        proxy_name: '代理甲',
        sale_id: '10000',
        sale_name: '销售1'
    }];

    let datas = {
        total: items.length,
        items: items
    };
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};

//选择代理
exports.getProxyList = function (req, res) {

    let items = [{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    },{
        proxy_id: 'D00001',
        proxy_name: '张飞',
        proxy_mobile: '18744452222',
        proxy_email: 'zhf@mdf.com',
        proxy_credentials: '452322198202212420',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }, {
        proxy_id: 'D00002',
        proxy_name: '李逵',
        proxy_mobile: '18744451111',
        proxy_email: 'lq@mdf.com',
        proxy_credentials: '452322198202212421',
        proxy_status: '正常',
        sale_id: '10000',
        sale_name: '销售1',
        account_status: "是"
    }];

    let datas = {
        total: items.length,
        items: items
    };
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};

//选择销售
exports.getSaleList = function (req, res) {

    let items = [{
        sale_id: '10000',
        sale_name: '张飞',
        sale_mobile: '18744452222',
        sale_email: 'zhf@mdf.com',
        sale_credentials: '452322198202212420',
        sale_department: '销售一部',
        sale_group: '一组',
        sale_status: '正常'
    }, {
        sale_id: '10001',
        sale_name: '李逵',
        sale_mobile: '18744451111',
        sale_email: 'lq@mdf.com',
        sale_credentials: '452322198202212421',
        sale_department: '销售一部',
        sale_group: '二组',
        sale_status: '正常'
    }];

    let datas = {
        total: items.length,
        items: items
    };
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};


//账号重新匹配-账户类型
exports.getAccountOptions = function (req, res) {

    let items = [{
        value: '70000-标准账户',
        label: '70000-标准账户'
    }, {
        value: '70001-赠金账户',
        label: '70001-赠金账户'
    }];

    let datas = {
        total: items.length,
        items: items
    };
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};

//账号重新匹配-账号列表
exports.getAccountList = function (req, res) {

    let items = [{
        customer_account: '80881234-标准账户',
        proxy_account: '70000-标准账户',
        proxy_account_new: '70000-标准账户'
    }, {
        customer_account: '80881235-赠金账户',
        proxy_account: '70001-赠金账户',
        proxy_account_new: '70001-赠金账户'
    }];

    let datas = {
        total: items.length,
        items: items
    };
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};



//变更客户归属记录
let customerModifiedLogData = relationMock.customerModifiedLogData();

exports.getCustomerModifiedLog = function (req, res, next) {
    let {page_size, page_no} = req.body;
    let result = getPagerData(customerModifiedLogData, page_size, page_no);
    res.json(result);
};

//变更账号归属记录
let accountModifiedLogData = relationMock.accountModifiedLogData();

exports.getAccountModifiedLog = function (req, res, next) {
    let {page_size, page_no} = req.body;
    let result = getPagerData(accountModifiedLogData, page_size, page_no);
    res.json(result);
};


//变更代理归属记录
let proxyModifiedLogData = relationMock.proxyModifiedLogData();

exports.getProxyModifiedLog = function (req, res, next) {
    let {page_size, page_no} = req.body;
    let result = getPagerData(proxyModifiedLogData, page_size, page_no);
    res.json(result);
};


function getPagerData(all, page_size, page_no)
{
    let total = all.length;
    let items = all.filter((u, index) => index < page_size * page_no && index >= page_size * (page_no - 1));
    let datas = {
        total: total,
        items: items
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    return result;
}