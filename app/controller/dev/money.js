/**
 * Created by zlp on 2017-12-19.
 */
var Mock = require('mockjs')
var moneyMock = require("../../mock/data/money");

/**
 * 入金
 * **/

let depositList = moneyMock.depositList();

exports.depositList = function (req, res, next) {
    let {page_no, id, type, deposit_type, status} = req.body;
    let mockUsers = depositList.filter(user => {
        if (id && user.id.indexOf(id) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (type && user.type != type) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (deposit_type && user.deposit_type != deposit_type) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (status && user.status != status) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total: total,
        items: mockUsers
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    res.json(result);
}

exports.handleDeposit = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '处理完成',
        datas: ''
    };
    res.json(result);
}
exports.confirmDeposit = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '入账成功',
        datas: ''
    };
    res.json(result);
}
exports.ignoreDeposit = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '已忽略',
        datas: ''
    };
    res.json(result);
}


/**
 * 出金
 * **/
let withdrawList = moneyMock.withdrawList();
exports.withdrawList = function (req, res, next) {
    let {page_no, id, type, deposit_type, status} = req.body;
    let mockUsers = withdrawList.filter(user => {
        if (id && user.id.indexOf(id) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (type && user.type != type) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (deposit_type && user.deposit_type != deposit_type) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (status && user.status != status) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total: total,
        items: mockUsers
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    res.json(result);
}

exports.handleWithdraw = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '处理完成',
        datas: ''
    };
    res.json(result);
}
exports.confirmWithdraw = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '入账成功',
        datas: ''
    };
    res.json(result);
}
exports.ignoreWithdraw = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '已忽略',
        datas: ''
    };
    res.json(result);
}

/**
 * 转账管理
 * **/
let transferList = moneyMock.transferList();
exports.transferList = function (req, res, next) {
    let {page_no, id, email, status} = req.body;
    let mockUsers = transferList.filter(user => {
        if (id && user.id.indexOf(id) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (email && user.email.indexOf(email) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (status && user.status != status) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total: total,
        items: mockUsers
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    res.json(result);
}

exports.handleTransferMoney = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '处理完成',
        datas: ''
    };
    res.json(result);
}
exports.ignoreTransferMoney = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '已忽略',
        datas: ''
    };
    res.json(result);
}

/**
 * 获取账户列表
 * **/
let accountList = moneyMock.accountList();
exports.accountList = function (req, res, next) {
    let {page_no, search} = req.body;
    let mockUsers = accountList.filter(user => {
        if (search && user.name.indexOf(search) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (search && user.mt4_no.indexOf(search) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (search && user.email.indexOf(search) == -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total: total,
        items: mockUsers
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    res.json(result);
}

exports.cleanAccountBalance = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '清零成功',
        datas: ''
    };
    res.json(result);
}

exports.ignoreCleanAccountBalance = function (req, res, next) {
    let {id} = req.body;
    var result = {
        status: 200,
        msg: '已忽略',
        datas: ''
    };
    res.json(result);
}


/**
 * 获取返利列表
 * **/
let rebateList = moneyMock.rebateList();
exports.rebateList = function (req, res, next) {
    let {page_no, search} = req.body;
    let mockUsers = rebateList.filter(user => {
        if (search && user.account != search && user.name.indexOf(search) == -1 && user.email.indexOf(search) == -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < 20 * page_no && index >= 20 * (page_no - 1));
    let datas = {
        total: total,
        items: mockUsers
    };
    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(datas)
    };
    res.json(result);
}