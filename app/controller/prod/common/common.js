/**
 * Created by zlp on 2018/01/24.
 * For 我的账户
 */
var API = require("../support/const");
var request = require('superagent')
    , fs = require('fs')
    , svgCaptcha = require('svg-captcha');

let result = {
    common: {}
};

//短信验证码
exports.sendSMS = function (req, res, next) {
    console.log(req.body);
    res.json({
        "status": 0,
        "msg": ""
    })
};

//邮箱唯一验证
exports.emailUnique = function (req, res, next) {
    let params = {
        email: req.body.email
    };
    request.get(`${API.common.email_unique}`)
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            //记录用户操作日志
            res.json(JSON.parse(_res.text));
        });
};

//邮箱验证码
exports.sendMail = function (req, res, next) {
    let params = {
        email: req.body.email
    };
    request.get(`${API.common.send_email_verify_code}`)
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            //记录用户操作日志
            if (_res) {
                res.json(JSON.parse(_res.text));
            }
        });
};

//获取汇率
exports.getRate = function (req, res, next) {
    let params = {
        rate_type: req.body.rate_type
    };
    // deposit_exchangerate	入金
    // withdraw_exchangerate	出金
    request.get(`${API.common.get_rate}`)
        .query({msg: JSON.stringify(params)})
        .end(function (_req, _res) {
            //记录用户操作日志
            res.json(JSON.parse(_res.text));
        });
};

//上传文件
exports.upload = function (req, res, next) {
    if (req.file) {
        let {roleType, roleId} = req.body;
        request.post(`${API.common.upload_img}`)
            .field('roleType', roleType)
            .field('roleId', roleId)
            .attach('uploadFileName', req.file.path)
            .end(function (_req, _res) {
                if (_res.status == 200) {
                    fs.unlink(req.file.path, function () {
                        res.json(JSON.parse(_res.text))
                    });
                }
              //  res.json(JSON.parse(_res.text));
            });
    }
};

//获取图形验证码
exports.captcha = {
    get: function (req, res, option) {
        const captcha = svgCaptcha.create({fontSize: 50, width: 150, height: 38});

        req.session.captcha = captcha.text;
        res.setHeader('Content-Type', 'image/svg+xml');
        res.write(String(captcha.data));
        res.end();
    },
    check: function (req, res, next) {
        let code = req.body.code
        let result = {
            status: 200,
            msg: "success"
        };
        if (req.session.captcha) {
            if (code.toLowerCase() != req.session.captcha.toLowerCase()) {
                result.status = 0
                result.msg = "验证码错误"
            }
        }

        res.json(result)
    }
};


//获取图片地址
exports.images = function (req, res) {

    let id = req.body.id || req.params.id

    request.get(`${API.common.get_img}${id}`)
        .end(function (_req, _res) {
           res.send(_res.text);
        });

};

exports.showImages = function (req, res) {
    let id = req.body.id || req.params.id
    request.get(`${API.common.get_img_liu}${id}`)
        .end(function (_req, _res) {
            let imgsrc = _res.text
            if(imgsrc){
                request(imgsrc).pipe(res)
            }


        });


};

let mimeType = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
}