var Mack = require('mockjs');
var accountMack= require('../../mock/data/accounts.js');

/**
 *账户列表
 */
var _accounts = accountMack.accounts();
exports.accountsList = function (req, res, next) {
    let {page_no,page_size,customer_name} = req.body;
    let items = _accounts.filter(account=>{
        if(customer_name && account.customer.customer_name.indexOf() === -1) return false;
        return ture;
    });
    let total = items.length;
    items = items.filter((a,index) => index < 20 * page_no && index >= 20 * (page_no -1));

    let datas ={
        total:total,
        items:items
    }
    var result={
        status: 200,
        msg: '添加成功',
        datas:JSON.stringify(datas)
    }
    res.json(result)
}