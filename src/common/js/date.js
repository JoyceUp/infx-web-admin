/* 日期格式化 */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
/*日期开始时间*/
export function dateStart(date) {
    if(date.length < 10)
    {
        return "";
    }
    if(date.length > 10)
    {
        date = date.substring(0, 10);
    }
    return (date + " 00:00:00");
};

/*日期结束时间*/
export function dateEnd(date) {
    if(date.length < 10)
    {
        return "";
    }
    if(date.length > 10)
    {
        date = date.substring(0, 10);
    }
    return (date + " 23:59:59");
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}