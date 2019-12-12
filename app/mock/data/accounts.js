var Mock = require('mockjs')

exports.accounts=function(){
    const accounts = [];

    for (let i = 0; i < 86; i++) {
        accounts.push(Mock.mock({
            id:Mock.Random.guid(),
            account_no:Mock.Ranaccountsdom.integer(10000,99999),
            account_type:Mock.Random.integer(1, 2, 3),             //1、标准账户 2、ECN账户 3、STP账户
            owner_role:Mock.Random.cname(),
            owner_id:Mock.Random.integer(10000,99999),
            customer:{
                customer_id:Mock.Random.guid(),
                customer_name:Mock.Random.cname(),
                mobile: Mock.mock(/^1[385][1-9]\d{8}/),//手机号码
                email: Mock.mock('@email'),//电子邮箱
                identityNo: '234324324',//证件号码
            },
            parent_account_id:Mock.Random.integer(10000,99999),
            parent_role:Mock.Random.cname(),
            parent_id:Mock.Random.integer(10000,99999),
            mt4_account_or_not:Mock.Random.integer(1, 2),
            leverage:'1:400',
            balance:"202.00",
            rebate:'0.3',
            state:Mock.Random.integer(1, 2),
            gmt_create:Mock.Random.date('yyyy-MM-dd'),
            gmt_modified:Mock.Random.date('yyyy-MM-dd')

        }));
    }
    return accounts
};