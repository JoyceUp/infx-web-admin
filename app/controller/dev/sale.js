/**
 * Created by zlp on 2017-12-19.
 */
var Mock = require('mockjs')
var saleMock = require("../../mock/data/sale");

/**
 * 人员管理
 * **/

let personnelList = saleMock.personnelList();

exports.personnelList = function (req, res, next) {
    let {page_no, id, name, phone, status} = req.body;
    let mockUsers = personnelList.filter(user => {
        if (id && user.id.indexOf(id) == -1) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (name && user.name != name) return false;
        return true;
    });
    mockUsers = mockUsers.filter(user => {
        if (phone && user.phone != phone) return false;
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

exports.addPersonnel = function (req, res, next) {
    let {name, gender, phone, email, status, desc, paperwork_type, paperwork_no, birthday, position_list} = req.body;

    let parm = {
        id: Mock.Random.guid(),
        name: name,
        gender: gender,
        phone: phone,
        email: email,
        status: status,
        desc: desc,
        paperwork_type: paperwork_type,
        paperwork_no: paperwork_no,
        birthday: birthday,
        position_list: position_list,
        status: 1,
        create_time: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
        update_time: Mock.Random.date('yyyy-MM-dd hh:mm:ss')
    };
    personnelList.unshift(parm);

    var result = {
        status: 200,
        msg: '添加完成',
        datas: ''
    };
    res.json(result);
}
exports.personnelSingle = function (req, res, next) {
    let {id} = req.body;
    let mockUsers = personnelList.filter(user => {
        if (id && user.id.indexOf(id) == -1) return false;
        return true;
    });
    var result = {};
    if (mockUsers.length == 0) {
        result = {
            status: 201,
            msg: '未找到用户',
            datas: JSON.stringify(mockUsers)
        };
    } else {
        result = {
            status: 200,
            msg: '查询成功',
            datas: JSON.stringify(mockUsers[0])
        };
    }
    res.json(result);
}
exports.delPersonnel = function (req, res, next) {
    let {id} = req.body;
    personnelList = personnelList.filter(u => u.id !== id);
    var result = {
        status: 200,
        msg: '删除成功',
        datas: ''
    };
    res.json(result);
}
exports.updatePersonnel = function (req, res, next) {
    let {id, name, gender, phone, email, status, desc, paperwork_type, paperwork_no, birthday, position_list} = req.body;

    personnelList.some(u => {
        if (u.id === id) {
            u.name = name;
            u.gender = gender;
            u.phone = phone;
            u.email = email;
            u.status = status;
            u.desc = desc;
            u.paperwork_type = paperwork_type;
            u.paperwork_no = paperwork_no;
            u.birthday = birthday;
            u.position_list = position_list;
            return true;
        }
    });

    var result = {
        status: 200,
        msg: '更新成功',
        datas: ''
    };
    res.json(result);
}


/**
 * 资源管理
 * **/

let departmentData = saleMock.departmentData();

exports.departmentList = function (req, res, next) {
    let {page} = req.body;

    var result = {
        status: 200,
        msg: '查询成功',
        datas: JSON.stringify(departmentData),
    }
    res.json(result)
}

exports.addDepartment = function (req, res, next) {

    let {name, uri, request_type, type, status, lev, parent_id, code, permission} = req.body;
    let addNode = {
        id: Mock.Random.guid(),
        name: name,
        uri: uri,
        request_type: request_type,
        type: type,
        status: status,
        lev: lev,
        parent_id: parent_id,
        code: code,
        permission: permission,
        children: []
    };
    if (parent_id == "") {
        departmentData.push(addNode);

    } else {
        departmentData.some(u => {
            if (u.children.length > 0) {
                u.children.some(n => {
                    if (n.id === parent_id) {
                        n.children.push(addNode);

                    }
                })
            }
            if (u.id === parent_id) {
                u.children.push(addNode);

            }
        });
    }

    var result = {
        status: 200,
        msg: '添加成功',
        datas: JSON.stringify({'id': addNode.id}),
    };

    res.json(result)
}

exports.removeDepartment = function (req, res, next) {
    let {id} = req.body;
    departmentData = departmentData.filter(u => u.id !== id);
    departmentData.some(m => {
        m.children = m.children.filter(m => m.id !== id)
        m.children.some(n => {
            n.children = n.children.filter(n => n.id !== id)
        })
    });

    var result = {
        status: 200,
        msg: '删除成功',
    };
    res.json(result)
}

exports.editDepartment = function (req, res, next) {
    let {id, name, uri, request_type, type, status, lev, parent_id, code, permission} = req.body;
    departmentData.some(u => {
        if (u.id === id) {
            u.name = name;
            u.uri = uri;
            u.request_type = request_type;
            u.type = type;
            u.status = status;
            u.lev = lev;
            u.parent_id = parent_id;
            u.code = code;
            u.permission = permission;
            return true;
        }
    });


    departmentData.some(u => {
        if (u.children.length > 0) {
            u.children.some(n => {
                if (n.children.length > 0) {
                    n.children.some(m => {
                        if (m.id === id) {
                            m.name = name;
                            m.uri = uri;
                            u.request_type = request_type;
                            m.type = type;
                            m.status = status;
                            m.lev = lev;
                            m.parent_id = parent_id;
                            m.code = code;
                            m.permission = permission;
                            return true;
                        }
                    })
                }

                if (n.id === id) {
                    n.name = name;
                    n.uri = uri;
                    n.request_type = request_type;
                    n.type = type;
                    n.status = status;
                    n.lev = lev;
                    n.parent_id = parent_id;
                    n.code = code;
                    n.permission = permission;
                    return true;
                }
            })
        }
        if (u.id === id) {
            u.name = name;
            u.uri = uri;
            u.request_type = request_type;
            u.type = type;
            u.status = status;
            u.lev = lev;
            u.parent_id = parent_id;
            u.code = code;
            u.permission = permission;
            return true;
        }

    });

    var result = {
        status: 200,
        msg: '修改成功',
    };
    res.json(result)
}

/*
 *  Created by XWang on 2017-01-03
 **/

//根据条件查找销售列表
let saleListData = saleMock.saleList();
exports.getSaleList = function (req, res) {
    let {page_size, page_no} = req.body;
    let result = getPagerData(saleListData, page_size, page_no);
    res.json(result);
};

//根据条件查找销售详情
// exports.getSaleDetails = function (req, res) {
//
//     datas = {
//         token: req.cookies.token
//     };
//
//
//     var result = [{
//         sale_id: "100000",
//         sale_name: "张三",
//         sale_mobile: "13800138000",
//         sale_email: "xx@mdf.com",
//         sale_created: "2017-11-10 11:24:03",
//         sale_modified: "2017-11-10 11:24:03",
//         sale_status: "启用"
//     }, {
//         sale_id: "100001",
//         sale_name: "李四",
//         sale_mobile: "13800138001",
//         sale_email: "xx1@mdf.com",
//         sale_created: "2017-11-10 11:24:03",
//         sale_modified: "2017-11-10 11:24:03",
//         sale_status: "停用"
//     }, {
//         sale_id: "100002",
//         sale_name: "王五",
//         sale_tel: "13800138002",
//         sale_email: "xx2@mdf.com",
//         sale_created: "2017-11-10 11:24:03",
//         sale_modified: "2017-11-10 11:24:03",
//         sale_status: "已删除"
//     }];
//     res.json(result);
// };
//基本信息
let saleBaseInfo = saleMock.saleBaseInfo();
exports.getSaleBaseInfo = function (req, res) {


    let datas = saleBaseInfo;
    var result = {
        status: 200,
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };

    res.json(result);
};

//客户信息
let customerListData = saleMock.customerList();
exports.getCustomerList = function (req, res) {
    let {page_size, page_no} = req.body;
    let result = getPagerData(customerListData, page_size, page_no);
    res.json(result);
};

//代理信息
let proxyListData = saleMock.proxyList();
exports.getProxyList = function (req, res) {

    let {page_size, page_no} = req.body;
    let result = getPagerData(proxyListData, page_size, page_no);
    res.json(result);
};

//返佣返利信息
// exports.getRebateList = function (req, res) {
//
//     datas = {
//         token: req.cookies.token
//     };
//     let result = [{
//         rebate_date: "2017-12-19",
//         rebate_customer_balance: "30",
//         rebate_proxy_balance: "50",
//         rebate_customer_transaction: "100",
//         rebate_sum: "180"
//     },
//         {
//             rebate_date: "2017-12-18",
//             rebate_customer_balance: "40",
//             rebate_proxy_balance: "60",
//             rebate_customer_transaction: "200",
//             rebate_sum: "300"
//         }];
//     res.json(result);
// };


//客户余额返利
let customerBalanceRebateList = saleMock.customerBalanceRebate();
exports.getCustomerBalanceRebate = function (req, res) {

    let {page_size, page_no} = req.body;
    let result = getPagerData(customerBalanceRebateList, page_size, page_no);
    res.json(result);

};

//客户交易返佣
exports.getCustomerTransactionRebate = function (req, res) {

    let items = [{
        rebate_date: "2017-01-06",
        sale_id: "1000",
        customer_id: "80882987",
        customer_name: "赵云",
        transaction_type: "外汇",
        transaction_count: "10",
        rebate_rate: "5USD/手",
        rebate_amount: "50"
    }, {
        rebate_date: "2017-01-06",
        sale_id: "1000",
        customer_id: "80882988",
        customer_name: "马超",
        transaction_type: "贵金属",
        transaction_count: "10",
        rebate_rate: "5USD/手",
        rebate_amount: "50"
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

//代理余额返利
// exports.getProxyBalanceRebate = function (req, res) {
//
//     datas = {
//         token: req.cookies.token
//     };
//     let result = [{
//         rebate_date: "2017-01-06",
//         proxy_id: "80882987",
//         proxy_name: "刘备",
//         proxy_balance: "1000.00",
//         rebate_rate: "10.00%",
//         rebate_amount: "10"
//     }, {
//         rebate_date: "2017-01-06",
//         proxy_id: "80882988",
//         proxy_name: "关羽",
//         proxy_balance: "1000.00",
//         rebate_rate: "10.00%",
//         rebate_amount: "10"
//     },
//         {
//             rebate_date: "2017-01-06",
//             proxy_id: "80882989",
//             proxy_name: "张飞",
//             proxy_balance: "1000.00",
//             rebate_rate: "10.00%",
//             rebate_amount: "10"
//         }];
//     res.json(result);
// };


//提成信息
exports.getDeductList = function (req, res) {

    let items = [{
        deduct_date: "2017-12-19",
        deduct_rate: "30%",
        deduct_amount: "150"
    },
        {
            deduct_date: "2017-12-18",
            deduct_rate: "30%",
            deduct_amount: "120"
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


//分页
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
        msg: '搜索完成',
        datas: JSON.stringify(datas)
    };
    return result;
}