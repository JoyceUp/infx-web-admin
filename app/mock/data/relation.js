
var Mock = require('mockjs');

//变更客户归属记录
exports.customerModifiedLogData = function () {
    const customerModifiedLogData = [];
    for (let i = 0; i < 83; i++) {
        customerModifiedLogData.push(Mock.mock({
            id: Mock.Random.guid(),
            customer_id: "C" + (10000 + i),
            customer_name: Mock.Random.cname(),


            proxy_id_before: "D" + (10000 + i),
            proxy_name_before: Mock.Random.cname(),


            sale_id_before: (10000 + i),
            sale_name_before: Mock.Random.cname(),


            proxy_id_after: "D" + (10000 + i),
            proxy_name_after: Mock.Random.cname(),


            sale_id_after: (10000 + i),
            sale_name_after: Mock.Random.cname(),

            modified_time: Mock.Random.datetime()
        }));
    }
    return customerModifiedLogData;
};


//变更账号归属记录
exports.accountModifiedLogData = function () {
    const accountModifiedLogData = [];
    for (let i = 0; i < 83; i++) {
        accountModifiedLogData.push(Mock.mock({
            id: Mock.Random.guid(),
            customer_account: (808812 + i),
            customer_name: Mock.Random.cname(),


            proxy_account_before: (60000 + i),
            proxy_name_before: Mock.Random.cname(),


            sale_account_before: (70000 + i),
            sale_name_before: Mock.Random.cname(),


            proxy_account_after: (80000 + i),
            proxy_name_after: Mock.Random.cname(),


            sale_account_after: (90000 + i),
            sale_name_after: Mock.Random.cname(),

            modified_time: Mock.Random.datetime()
        }));
    }
    return accountModifiedLogData;
};


//变更代理归属记录
exports.proxyModifiedLogData = function () {
    const proxyModifiedLogData = [];
    for (let i = 0; i < 83; i++) {
        proxyModifiedLogData.push(Mock.mock({
            id: Mock.Random.guid(),

            proxy_id: "D" + (10000 + i),
            proxy_name: Mock.Random.cname(),


            sale_id_before: (10000 + i),
            sale_name_before: Mock.Random.cname(),



            sale_id_after: (10000 + i),
            sale_name_after: Mock.Random.cname(),

            modified_time: Mock.Random.datetime()
        }));
    }
    return proxyModifiedLogData;
};