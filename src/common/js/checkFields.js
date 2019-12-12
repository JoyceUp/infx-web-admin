let phoneReg=/^1[3|4|5|7|8][0-9]{9}$/;
let emailReg=/^[A-z0-9]+([._\\-]*[A-z0-9])*@([A-z0-9]+[-A-z0-9]*[A-z0-9]+.){1,63}[A-z0-9]+$/;
let qqReg=/^[1-9]\d{4,8}$/;

// 新增用户
let passwordReg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;//正则：密码 //长度 6 -20，必须字母与数字组合
let userNameReg=/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;//正则：用户名 // 5-16位 英文字母、数字、下划线组合(最少含有1个字母且以字母开头)
let nickNameReg=/^[a-zA-Z\u4e00-\u9fa5]{3,20}$/;//正则：昵称 // 3-20位 中文、字母或组合
let identityNoReg = /^(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)$/




export function password(rule,value,callback){
    if(rule.required){
        if(!value){
            callback(new Error("请填写密码"));
        }

        if(!passwordReg.test(value)){
            callback(new Error("密码要求长度6-20位的字母与数字组合"));
        }else{
            callback();
        }
    }else{
        callback();
    }


}

export function userName(rule,value,callback){
    if(!value){
        callback(new Error("请填写用户名"));
    }

    if(!userNameReg.test(value)){
        callback(new Error("用户名要求5-16位 英文字母、数字、下划线组合(最少含有1个字母且以字母开头)"));
    }else{
        callback();
    }
}

export function nickname(rule,value,callback){
    if(!value){
        callback();
    }

    if(!nickNameReg.test(value)){
        callback(new Error("昵称要求3-20位 中文、字母或组合"));
    }else{
        callback();
    }
}

export function phone(rule, value, callback){
    if (!value) {
       return callback(new Error('手机号不能为空'));
    }
    if(!phoneReg.test(value))
    {
        callback(new Error('请输入正确的手机号码'));
    } else {
        callback()
    }

}

export function email(rule, value, callback){
    if (!value) {
        //return callback(new Error('邮箱不能为空'));
        callback()
    }
    if(!emailReg.test(value))
    {
        callback(new Error('请输入正确的邮箱'));
    } else {
        callback()
    }

}
export function qq(rule, value, callback){
    if (!value) {
        //  return callback(new Error('qq不能为空'));

    }
    if(!qqReg.test(value))
    {
        callback(new Error('请输入正确的qq'));
    } else {
        callback()
    }

}

export function sele(rule, value, callback){
    if (!value) {
        return callback(new Error('此项为必选'));
    }

    callback()

}




//新增资源

// let nameReg=/^[a-zA-Z0-9\u4e00-\u9fa5]{3,20}$/
let nameReg=/^[\s\S]{3,20}$/
let uriReg=/^(\/[a-z0-9@_-]*)*$/;



export function name(rule,value,callback){
    if(rule.required){
        if(!value){
            callback(new Error("请填写资源名称"));
        }
        if(!nameReg.test(value)){
            callback(new Error("资源名称长度要求3-20位"));/*资源名称要求长度3-20位的字母、数字、汉字*/
        }else{
            callback();
        }
    }else{
        callback();
    }
}

export function uri(rule, value, callback) {
    if(rule.required){
        if(!value){
            callback(new Error("请填写URL路径"));
        }
        if(value.length>100){
            callback(new Error("URL路径长度要小于50"));
        }
        if(!uriReg.test(value)){
            callback(new Error("请填写正确的URL路径/***/***"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}
export function codeMustBeNumber(rule, value, callback) {
    if(rule.required){
        if(!value){
            callback(new Error("请填写编码"));
        }
        if(value.length>9){
            callback(new Error("URL地址长度要小于10"));
        }
        if(!/^[0-9]*$/.test(value)){
            callback(new Error("编码值必须为数字"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}

export function backMoneyMustBeNumber(rule,value,callback){
    if(rule.required){
        if(!value) {
            callback(new Error("请填写退回金额"));
        }
        if(!/^[0-9]*$/.test(value)){
            callback(new Error("退回金额必须为数字"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}

//系统参数

let keyReg=/^^[0-9a-zA-Z_]{2,50}$/
let valueReg=/^^[0-9a-zA-Z_.]{1,20}$/

export function key(rule,value,callback){
    if(rule.required){
        if(!value){
            callback(new Error("请填写参数名"));
        }
        if(!keyReg.test(value)){
            callback(new Error("要求长度2-50位的字母数字或下划线"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}

export function value(rule,value,callback){
    if(rule.required){
        if(!value){
            callback(new Error("请填写配置内容"));
        }
        if(!valueReg.test(value)){
            callback(new Error("要求长度1-20位的字母数字或下划线"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}



//代理

/*
let notEmpty = /^\s*$/g;

export function key(rule,value,callback){
    if(rule.required){
        if(!value){
            callback(new Error("请填写参数名"));
        }
        if(!keyReg.test(value)){
            callback(new Error("要求长度3-20位的字母或下划线"));
        }else{
            callback();
        }
    }else{
        callback();
    }
}*/
//身份证号码验证
export function identity_no (rule,value,callback){

    if(rule){
        if(!value){
            callback(new Error("请填写证件号码"));
        }
        if(!identityNoReg.test(value)){
            callback(new Error("身份证号格式错误"));
        }else {
            callback();
        }
    }else {
        callback();
    }

}

//出生日期
export function date_of_birth(rule, value, callback){
    if (!value) {
        callback()
    }
    if(!emailReg.test(value))
    {
        callback(new Error('请输入正确的邮箱'));
    } else {
        callback()
    }

}
