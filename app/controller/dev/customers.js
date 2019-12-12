/**
 * author:yuyingzhi
 * created date :2018-01-03
 */
var Mock = require('mockjs')
var customersMock = require("../../mock/data/customers.js");

let _customers = customersMock.Customers();
exports.customersList=function(req,res,next){
    let _res = res;
    let _req = req;
    let{page_no,page_size,customer_name}=_req.body;

    let mockUsers = _customers.filter(customer => {
        if (customer_name && customer.customer_name.indexOf(customer_name) === -1) return false;
        return true;
    });
    let total = mockUsers.length;
    mockUsers = mockUsers.filter((u, index) => index < page_size * page_no && index >= page_size * (page_no - 1));
    let datas ={
        total:total,
        items:mockUsers
    };

    let result ={
        status:'200',
        msg:'获取客户列表',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};


exports.getCustomerById = function(req,res,next){
    let _res = res;
    let _req = req;
    let{customer_id} = req.body;

    let mockUsers = _customers.filter(customer => {
        if (customer_id && customer.customer_id.indexOf(customer_id) === -1) return false;
        return true;
    });
    var result = {
        status: 200,
        msg: '获取客户信息id='+customer_id,
        datas:mockUsers
    }

    _res.json(result)
};


exports.updateCustomer = function(req,res,next){
    let _res = res;
    let _req = req;
    let{customer_id} = req.body;

    var result = {
        status : 200,
        msg:'修改成功',
        datas:''
    }
    _res.json(result);
};

exports.deleteCustomer = function(req,res,next){
    let _res = res;
    let _req = req;
    let{customer_id} = req.body;

    var result ={
        status :200,
        msg:'删除成功',
        datas:''
    };
    _res.json(result);

};

exports.customerAccountList = function(req,res,next){
    let _res = res;
    let _req = req;
    let{customer_id} = req.body;

    var result ={
        status :200,
        msg:'删除成功',
        datas:''
    };
    _res.json(result);
}
