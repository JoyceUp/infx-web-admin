/**
 *
 * @Description
 * @Author songzhitao
 * @Created
 *
 */

module.exports = {
    formatTableData: function (_res) {
        return new Promise(function (resolve, reject) {
            let data = JSON.parse(_res.text);
            if (data.status == 200) {
                if (data.datas) {
                    let datas = JSON.parse(data.datas);
                    resolve({
                        status: data.status //成功的状态码，默认：0
                        , msg: data.msg //状态信息的字段名称，默认：msg
                        , count: datas.total //数据总数的字段名称，默认：count
                        , datas: datas.items //数据列表的字段名称，默认：data
                    });
                } else {
                    resolve(JSON.parse(_res.text));
                }
            } else {
                resolve(JSON.parse(_res.text));
            }
        });
    }
};
