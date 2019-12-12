/* 当数据的某个字段其中有空值，返回-- */
export function isNull(val) {
    return (val == "" || val == undefined || val == null) ? " - - " : val;
};

/* 截取出生日期长度，显示年月日 */
export function isBirthDate(val) {
    return isNotNull(val) ? "" : val.substring(0, 10);
};

/* 计算两个数据 val(除数)，dividends（被除数）*/
export function isCalculate(val, dividends, dividends2) {

    if(isNotNull(val) || isNotNull(dividends) || isNotNull(dividends2)){
        return " - ";
    }else{
        return val/dividends/dividends2 ;
    }
};

/* 国家代号是否有值，无值默认62，手机号是否有值
 * 正确格式：空格 + 加号 + 国家代号 + 空格 + 手机号
 *  eg: + 62 13546526354
 */
export function outputValue(val, phone) {
    val = isNotNull(val) ? " + 62 " : (" + " + val + " ");
    return isNotNull(phone) ? "" : (val + phone);
}

function isNotNull(val) {
    return (val == "" || val == undefined || val == null) ? true : false;
};


//美分变美元，人民币同
export function centToDollar(cent) {
    if (cent) {
        var dollar = cent / 100;
        return parseFloat(dollar.toFixed(2));
    }
    return 0;
}


//除以100
export function dividedBy100(cent) {
    if (cent) {
        return cent / 100;
    }
    return 0;
}
//汇率
export function computeRate(rate) {
    if (rate) {
        return rate / 10000;
    }
    return 0;
}
//去除前后空格
export function trimBlank(rate) {
    return rate.replace(/(^\s*)|(\s*$)/g, "");
}


//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
export function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""));
    r2=Number(arg2.toString().replace(".",""));
    return (r1/r2)*Math.pow(10,t2-t1);
}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
export function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
//减法函数 arg2-arg1
export function accSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg2*m-arg1*m)/m).toFixed(n);
}