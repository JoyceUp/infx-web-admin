let download = require("react-file-download");

function getFileName(headers) {
    if (headers && headers["content-disposition"]) {
        return decodeURI(headers["content-disposition"]).split('=')[1];
    }
    return 'download';
}

function getMine(headers) {
    if (headers && headers["content-type"]) {
        return headers["content-type"];
    }
    return 'application/octet-stream';
}

export function fileDownload(res, vue) {
    let data = res.data;

    // 如果是链接
    if(data.status){
        if(data.status === 200) {
            window.location.href = data.datas;
        }
        else {
            vue.$message.error(data.status + " " + data.msg);
        }
        return;
    }

    // 如果是流
    let headers = res.headers;
    let filename = getFileName(headers);
    let mine = getMine(headers);

    download(data, filename, mine);
};
