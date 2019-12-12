//import Mock from 'mockjs';
var Mock = require('mockjs')

exports.personnelList = function () {
    const depositList = [];
    for (let i = 0; i < 80; i++) {
        depositList.push(Mock.mock({
            id: Mock.Random.guid(),
            account: Mock.Random.integer(80000000, 90000000),
            name: Mock.Random.cname(),
            gender: Mock.Random.integer(0, 1),        //0女 1男
            phone: Mock.Random.integer(100000000, 999999999),
            email: Mock.Random.email(),
            create_time: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
            update_time: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
            status: Mock.Random.integer(1, 2, 3),        //1启用 2停用 3已删除
            desc: Mock.Random.csentence(),

            paperwork_type: Mock.Random.integer(1, 2),
            paperwork_no: Mock.Random.integer(100000000, 999999999),
            birthday: Mock.Random.date('yyyy-MM-dd'),
            position_list: [
                {
                    compeny:'',
                    department:'',
                    group:'',
                    position:'',
                }
            ]
        }));
    }
    return depositList;
}

exports.departmentData = function () {
    const departmentData = [];
    for (let i = 0; i < 3; i++) {
        let status = Mock.Random.integer(0, 1);
        departmentData.push(Mock.mock({
            id: Mock.Random.guid(),
            paperwork_no: Mock.Random.guid(),
            name: Mock.Random.cname(),
            paperwork_type: Mock.Random.integer(0, 1, 2),
            principal_id: status,
            lev: 1,
            desc: "",
            parent_id: '',
            children: function () {
                const childrenData = [];
                for (let j = 0; j < Mock.Random.integer(3, 5, 7, 9); j++) {
                    status = Mock.Random.integer(0, 1);
                    childrenData.push(Mock.mock({
                        id: Mock.Random.guid(),
                        paperwork_no: Mock.Random.guid(),
                        name: Mock.Random.cname(),
                        paperwork_type: Mock.Random.integer(0, 1, 2),
                        principal_id: status,
                        lev: 1,
                        desc: "",
                        parent_id: '',
                        children: function () {
                            const childrenData = [];
                            for (let j = 0; j < Mock.Random.integer(3, 5, 7, 9); j++) {
                                status = Mock.Random.integer(0, 1);
                                childrenData.push(Mock.mock({
                                    id: Mock.Random.guid(),
                                    paperwork_no: Mock.Random.guid(),
                                    name: Mock.Random.cname(),
                                    paperwork_type: Mock.Random.integer(0, 1, 2),
                                    principal_id: status,
                                    lev: 1,
                                    desc: "",
                                    parent_id: '',
                                    children: [],
                                    code: 50000 + (j * 10),
                                    permission: "get",
                                    create_time: Mock.Random.date('yyyy-MM-dd'),
                                    update_time: Mock.Random.date('yyyy-MM-dd')
                                }));
                            }
                            return childrenData
                        },
                        code: 30000 + (j * 10),
                        permission: "get",
                        create_time: Mock.Random.date('yyyy-MM-dd'),
                        update_time: Mock.Random.date('yyyy-MM-dd')
                    }));
                }
                return childrenData
            },
            code: 10000 + (i * 10),
            create_time: Mock.Random.date('yyyy-MM-dd'),
            update_time: Mock.Random.date('yyyy-MM-dd')
        }));
    }
    return departmentData;
}


/*
*   Added by XWang on 2018-01-09
* */
//销售列表
exports.saleList = function () {
    const saleList = [];
    let status_array = ['在职', '兼职', '离职'];
    for (let i = 0; i < 80; i++) {
        saleList.push(Mock.mock({
            sale_id: 10000 + i,
            sale_name: Mock.Random.cname(),
            sale_mobile: /^1[385][1-9]\d{8}/,
            sale_email: Mock.Random.email("mdf.com"),
            sale_created: Mock.Random.datetime(),
            sale_modified: Mock.Random.datetime(),
            sale_status: status_array[Mock.Random.integer(0, 2)]
        }));
    }
    return saleList;
};
//销售基本信息
exports.saleBaseInfo = function () {
    const saleBaseInfo = {
        sale_name: "韦小宝",
        sale_gender: "男",
        sale_birth: "1999-01-01",
        sale_mobile: "13200132000",
        sale_email: "dengchao@mdf.com",
        sale_id: "10000",
        sale_account: "1234567",
        sale_identity_type:"身份证",
        sale_identity_no:"131026198809120978",
        sale_note: "3###",
        sale_created: "2016-01-01",
        sale_modified: "2016-11-11",
        sale_info:[{
            sale_company: "销售公司",
            sale_department: "销售一部",
            sale_group: "一组",
            sale_title: "客户总监"
        },{
            sale_company: "销售公司",
            sale_department: "销售一部",
            sale_group: "一组",
            sale_title: "团队经理"
        },{
            sale_company: "销售公司",
            sale_department: "销售一部",
            sale_group: "一组",
            sale_title: "客户经理"
        }]
    };

    return saleBaseInfo;
};

//客户列表
exports.customerList = function () {
    const customerList = [];
    let customer_status = ['正常', '已删除'];
    for (let i = 0; i < 80; i++) {
        customerList.push(Mock.mock({
            customer_id: "C" + (10000 + i),
            customer_created: Mock.Random.date("yyyy-MM-dd"),
            customer_name: Mock.Random.cname(),
            customer_mobile: /^1[385][1-9]\d{8}/,
            customer_email: Mock.Random.email("mdf.com"),
            customer_credentials: /^[1-9]\d{17}/,
            customer_balance: Mock.Random.float(100, 10000, 0, 2),
            customer_status: customer_status[Mock.Random.integer(0, 1)]
        }));
    }
    return customerList;
};

//客户列表
exports.proxyList = function () {
    const proxyList = [];
    let proxy_status = ['正常', '已删除'];
    for (let i = 0; i < 80; i++) {
        proxyList.push(Mock.mock({
            proxy_id: "D" + (10000 + i),
            proxy_created: Mock.Random.date("yyyy-MM-dd"),
            proxy_name: Mock.Random.cname(),
            proxy_mobile: /^1[385][1-9]\d{8}/,
            proxy_email: Mock.Random.email("mdf.com"),
            proxy_credentials: /^[1-9]\d{17}/,
            proxy_balance: Mock.Random.float(100, 10000, 0, 2),
            proxy_status: proxy_status[Mock.Random.integer(0, 1)]
        }));
    }
    return proxyList;
};

//客户余额返利
exports.customerBalanceRebate = function () {
    const rebateList = [];
    // for (let i = 0; i < 56; i++) {
    //     rebateList.push(Mock.mock({
    //         rebate_date: Mock.Random.date("yyyy-MM-dd"),
    //         sale_id: (10000 + i),
    //         customer_id: "C" + (10000 + i),
    //         customer_name: Mock.Random.cname(),
    //         customer_balance: Mock.Random.float(100, 10000, 0, 2),
    //         rebate_rate: "10.00%",
    //         rebate_amount: Mock.Random.float(1, 100, 0, 2)
    //     }));
    // }
    return rebateList;
};
