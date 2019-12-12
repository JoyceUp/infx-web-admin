/**
 * author:yuyingzhi
 * created date :2018-01-03
 */
var Mock = require('mockjs')
var customersMock = require("../../mock/data/potential_customers.js");

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
        msg:'',
        datas:JSON.stringify(datas)
    };
    _res.json(result);
};