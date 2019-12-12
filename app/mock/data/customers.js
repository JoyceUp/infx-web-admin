//import Mock from 'mockjs';
var Mock = require('mockjs')

exports.Customers=function(){
    const Customers = [];

    for (let i = 0; i < 86; i++) {
        Customers.push(Mock.mock({
            customer_id: Mock.Random.guid(),
            customer_name: Mock.Random.cname(),
            create_date:"2018-01-03" + i,//注册时间
            mobile:'1811853506'+ i,//手机号码
            email:'81681981@qq.com'+i,//电子邮箱
            identityNo:'43454534'+i,//证件号码
            account_balance:'222'+i,//账户余额
            status:'1'//状态
        }));
    }
    return Customers
};