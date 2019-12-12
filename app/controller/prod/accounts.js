var request = require("superagent");
var API = require("./support/const");
var service = require("../../service/log");

/**
 *账户列表
 */
//导出excel通用方法，
function exportExcel(req, res, header, params, api, type) {
    request.get(api)
        .set(header)
        .responseType("blob")
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            if (_res.status === 200) {
                service.save_user_log({'type': 'getList', 'msg': '导出' + type + '列表'}, req);
            }
            //导出型api, 返回文件流，在_res.body中, 而不在_res.text中
            //_res.body有可能是文件内容，也可能是错误信息
            var buffer = Buffer.from(_res.body);
            if (_res.header["content-type"]) {
                res.setHeader('Content-Type', _res.header["content-type"]);
            }
            if (_res.header["content-disposition"]) {
                res.setHeader('Content-disposition', _res.header["content-disposition"]);
            }
            res.end(buffer);
        });
}

exports.accountsList = {
    //客户账号列表
    customers: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.accounts.account_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }

            });
    },
    //查看详情
    customerInfo:function(req, res, next){
      let header = {
          token:req.cookies.token
      };
      let params = req.body;
      request.get(API.accounts.account_info)
          .set(header)
          .query({msg:JSON.stringify(params)})
          .end(function(_req,_res){
              if(_res.status == 200){
                  res.json(JSON.parse(_res.text))
              }else{
                  res.json(_res)
              }
          });
    },

    //激活账号
    enableAccount:function(req,res,next){
        let header = {
            token:req.cookies.token
        };
        let params = req.body;
        request.put(API.accounts.account_enable)
            .set(header)
            .query({msg:JSON.stringify(params)})
            .end(function(_req,_res){
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    //导出客户账号
    exportCustomer:function(req, res,next){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.accounts.accounts_export;
        exportExcel(req, res, header, params, api, "客户账户");

    },

    //代理账号列表
    agents:function(req, res, next){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.accounts.agents_account_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    agentInfo:function(req,res,next){

        let header ={
            token: req.cookies.token
        };
        request.get(API.accounts.agent_account_info)
            .set(header)
            .query({msg: JSON.stringify(req.body)})
            .end(function (_req, _res) {
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    exportAgent:function(req, res, next){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.accounts.agent_account_export;
        exportExcel(req, res, header, params, api, "代理账户");
    },

    //获取某个账号的入金记录
    depositList:function(req,res,next){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.accounts.account_deposit)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }

            });
    },

    //#待审核列表
    reviewLists: function (req, res, next) {
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        request.get(API.accounts.open_account_list)
            .set(header)
            .query({msg: JSON.stringify(params)})
            .end(function (_req, _res) {
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }

            });
    },
    //#待审核列表    查看详情
    reviewInfo:function(req, res, next){
        let header = {
            token:req.cookies.token
        };
        let params = req.body;

        request.get(API.accounts.open_account_info+req.body.id)
            .set(header)
            .query({msg:JSON.stringify(params)})
            .end(function(_req,_res){
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },

    //#待审核列表    文件审核
    openAccountByFile:function(req,res,next){
        let header = {
            token:req.cookies.token
        };
        let params = req.body;
        request.put(API.accounts.open_account_file)
            .set(header)
            .query({msg:JSON.stringify(params)})
            .end(function(_req,_res){
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    //#待审核列表    开通
    openAccount:function(req,res,next){
        let header = {
            token:req.cookies.token
        };
        let params = req.body;
        request.put(API.accounts.open_account_agree)
            .set(header)
            .query({msg:JSON.stringify(params)})
            .end(function(_req,_res){
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    //#待审核列表    拒绝
    rejectAccount:function(req,res,next){
        let header = {
            token:req.cookies.token
        };
        let params = req.body;
        request.put(API.accounts.open_account_refuse)
            .set(header)
            .query({msg:JSON.stringify(params)})
            .end(function(_req,_res){
                if(_res.status == 200){
                    res.json(JSON.parse(_res.text))
                }else{
                    res.json(_res)
                }
            });
    },
    //导出客户账号
    exportReview:function(req, res,next){
        let header = {
            token: req.cookies.token
        };
        let params = req.body;
        let api = API.accounts.accounts_export;
        exportExcel(req, res, header, params, api, "客户账户");

    },



}