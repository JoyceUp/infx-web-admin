var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    //操作cookies方法!
    cookieMethod: {

        setCookie: function (objName, objValue, objHours, path) {// 添加cookie
            var str = objName + "=" + escape(objValue);
            if (objHours > 0) {// 为0时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString() + ";path=" + path + "/";
            }
            document.cookie = str;
            //alert("添加cookie成功");
        },

        getCookie: function (objName) {// 获取指定名称的cookie的值
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName)
                    return unescape(temp[1]);
            }
        },

        delCookie: function (name) {// 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a; expires=" + date.toGMTString();

        }
        /*
        setCookie: function (name, value) {
                        var Days = 30;
                        var exp = new Date();
                        exp.setTime(exp.getTime() + Days * 2 * 60 * 60 * 1000);
                        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
                    },

                    getCookie: function (name) {
                        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

                        if (arr = document.cookie.match(reg))

                            return unescape(arr[2]);
                        else
                            return null;
                    },

                    delCookie: function (name) {
                        var exp = new Date();
                        exp.setTime(exp.getTime() - 1);
                        var cval = this.getCookie(name);
                        if (cval != null)
                            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
                    }*/
    },

    formatDate: {


        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    }

};
