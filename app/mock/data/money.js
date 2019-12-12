//import Mock from 'mockjs';
var Mock = require('mockjs')


exports.accountList = function () {
    const depositList = [];
    for (let i = 0; i < 84; i++) {
        depositList.push(Mock.mock({
            id: Mock.Random.guid(),
            type: Mock.Random.integer(1, 2, 3),             //1、标准账户 2、ECN账户 3、STP账户
            mt4_no: Mock.Random.integer(80000000, 90000000),
            mt4_group: Mock.Random.integer(1, 2, 3, 4),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
            balance_usd: Mock.Random.integer(1000, 3000),
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd'),
            status: Mock.Random.integer(1, 2, 3, 4),        //1已提交(查看、处理（变更状态为已支付）、忽略)、2已支付(财务查看/资金查看，入账，忽略)、3已完成、4已忽略
            desc: Mock.Random.csentence()
        }));
    }
    return depositList;
}

exports.depositList = function () {
    const depositList = [];
    for (let i = 0; i < 84; i++) {
        depositList.push(Mock.mock({
            mt4_no: Mock.Random.integer(80000000, 90000000),
            id: Mock.Random.guid(),
            account: Mock.Random.integer(80000000, 90000000),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
            type: Mock.Random.integer(1, 2, 3),             //1、标准账户 2、ECN账户 3、STP账户
            deposit: Mock.Random.integer(),
            deposit_type: Mock.Random.integer(1, 2, 3),    //1、电汇 2、银行卡 3、微信
            exchange_rate: '1.6',
            payment_amount_cny: '1000',
            payment_amount_usd: '500',
            status: Mock.Random.integer(1, 2, 3, 4),        //1已提交(查看、处理（变更状态为已支付）、忽略)、2已支付(财务查看/资金查看，入账，忽略)、3已完成、4已忽略
            desc: Mock.Random.csentence(),
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd')
        }));
    }
    return depositList;
}

exports.withdrawList = function () {
    const depositList = [];
    for (let i = 0; i < 84; i++) {
        depositList.push(Mock.mock({
            mt4_no: Mock.Random.integer(80000000, 90000000),
            id: Mock.Random.guid(),
            account: Mock.Random.integer(80000000, 90000000),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
            type: Mock.Random.integer(1, 2, 3, 4),             //1、标准账户 2、ECN账户 3、STP账户 4、代理
            withdraw: Mock.Random.integer(1000, 5000),             //申请金额
            withdraw_type: Mock.Random.integer(1, 2),    //1、电汇 2、借记卡
            is_fee:  Mock.Random.integer(0, 1),             //是否收费
            fee: Mock.Random.float(),           //手续费
            exchange_rate: '1.6',
            payment_amount_cny: '1000',
            payment_amount_usd: '500',
            status: Mock.Random.integer(1, 2, 3, 4, 5),        //1已提交、2处理中、3已忽略、4已退回 5、已完成
            desc: Mock.Random.csentence(),
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd'),

            bank_no: '',
            bank_account_name: '',
            bank_name: '',
            bank_country: '',
            province: '',
            city: '',
            bank_branch_name: '',
            bank_branch_address: '',
            bank_swift_code: ''
        }));
    }
    return depositList;
}
exports.transferList = function () {
    const depositList = [];
    for (let i = 0; i < 84; i++) {
        depositList.push(Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),

            from_account: Mock.Random.integer(80000000, 90000000),
            from_account_type: Mock.Random.integer(1, 2, 3, 4),             //1、标准账户 2、ECN账户 3、STP账户 4、代理
            from_account_group: Mock.Random.integer(1, 2, 3, 4),
            from_account_balance: Mock.Random.integer(1000, 5000),             //余额
            from_account_can_use_balance: Mock.Random.integer(1000, 5000),     //可用余额

            to_account: Mock.Random.integer(80000000, 90000000),
            to_account_type: Mock.Random.integer(1, 2, 3, 4),             //1、标准账户 2、ECN账户 3、STP账户 4、代理
            to_account_group: Mock.Random.integer(1, 2, 3, 4),
            to_account_balance: Mock.Random.integer(1000, 5000),             //余额
            to_account_can_use_balance: Mock.Random.integer(1000, 5000),     //可用余额

            money_usd: Mock.Random.integer(1000, 5000),             //申请金额
            status: Mock.Random.integer(1, 2, 3, 4, 5),        //1已提交、2处理中、3已忽略、4已退回 5、已完成
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd'),
            desc: Mock.Random.csentence()
        }));
    }
    return depositList;
}


exports.rebateList = function () {
    const depositList = [];
    for (let i = 0; i < 80; i++) {
        depositList.push(Mock.mock({
            id: Mock.Random.guid(),
            account: Mock.Random.integer(80000000, 90000000),
            name: Mock.Random.cname(),
            email: Mock.Random.email(),
            before_balance_usd: Mock.Random.integer(1000, 3000),
            money_usd: Mock.Random.integer(1000, 3000),
            after_balance_usd: Mock.Random.integer(1000, 3000),
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd'),
            status: Mock.Random.integer(1, 2, 3, 4),        //1已提交(查看、处理（变更状态为已支付）、忽略)、2已支付(财务查看/资金查看，入账，忽略)、3已完成、4已忽略
            desc: Mock.Random.csentence()
        }));
    }
    return depositList;
}