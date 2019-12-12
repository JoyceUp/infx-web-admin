//import Mock from 'mockjs';
var Mock = require('mockjs')

/*
    name: Mock.Random.cname(),  //随机产生一个中文的姓名
    addr: Mock.mock('@county(true)'), //随机生成一个地址
    'age|18-60': 1, //随机生成一个数字 大小在18到60
    birth: Mock.Random.date(), //随机生成一个日期
    sex: Mock.Random.integer(0, 1),//随机生成一个整数，0/1 ，根据这个来给“男” “女”
    email:Mock.mock('@EMAIL()'), //随机生成一个邮箱
    'moblie|1':['13531544954','13632250649','15820292420','15999905612'], //在数组中随机找一个
    'num1|1-100.2':1, //1-100 中随机生成一个保留两位小数点
    'num2|100-300.2':1,
    'classroom|1':['精品语文班','精品作业A班','英语班','语文班'],
    'from|1':['到店咨询','微店','壹家教','学习服务平台'],
    'status|1':['意识强烈','预报名','意向一般','暂无意向'],
     time:Mock.Random.date('yyyy-MM-dd'),
     mobile:/^1[0-9]{10}$/  //用正则匹配1开头的11位数字的手机号
      'age|18-60': 1,
    birth: Mock.Random.date(),

*/

exports.Agents=function(){
    const Agents = [];

    for (let i = 0; i < 86; i++) {
        Agents.push(Mock.mock({
            id: Mock.Random.guid(),
            agent_name: Mock.Random.name(),
            gmt_create:Mock.Random.date('yyyy-MM-dd'),//登记时间
            gender: Mock.Random.integer(1,2),//称呼
            email:'81681981@qq.com'+i,//电子邮箱
            identity_type:Mock.Random.integer(0,2),//证件类型
            identity_no:/^1[0-9]{17}$/,//证件号码
            invite_id:'Y0207806'+i,//邀请人ID
            invite_name:Mock.Random.name(),//邀请人姓名
            gmt_modified:Mock.Random.date('yyyy-MM-dd'),//更新时间
            mark : Mock.Random.cparagraph(2),//备注
            state:Mock.Random.integer(0,2),//状态
            'account_balance|1-100.2':1,    //账户余额
        }));
    }
    return Agents;
};

/*注册待审核列表*/
exports.PendAgents=function(){
    const PendAgents = [];

    for (let i = 0; i < 86; i++) {
        PendAgents.push(Mock.mock({
            id: Mock.Random.guid(),
            agent_name: Mock.Random.name(),
            gmt_create:Mock.Random.date('yyyy-MM-dd'),//注册时间
            mobile:/^1[0-9]{10}$/,//手机号码
            email:Mock.mock('@EMAIL()'),//电子邮箱
            identity_no:/^1[0-9]{17}$/,//证件号码
            invite_id:'Y0207806'+i,//邀请人ID
            invite_name:Mock.Random.name(),//邀请人姓名
            gmt_modified:Mock.Random.date('yyyy-MM-dd'),//更新时间
            state:Mock.Random.integer(0,2),//状态

            agent_id:'D00207808'+i,    //  代理ID
            'account_balance|1-100.2':1,    //账户余额
        }));
    }
    return PendAgents;
};