const fs = require('fs');
const path = require('path');
const url = require('url');

getUrl('http://www.clevaly.com/img/vi_ues.gif', data => {
    fs.writeFile(path.join(__dirname,'download','vi_ues-node03.gif'),data,'utf8',(err)=>{
        if(err) throw err;
        console.log('文件保存成功');
    });
});

function getUrl(sUrl, success) {
    let urlObj = url.parse(sUrl);
    let http = '';
    if (urlObj.protocol === 'http:') {
        http = require('http');
    } else {
        http = require('https');
    }
    let req = http.request({
        'hostname': urlObj.hostname,
        'path': urlObj.path
    }, res => {
        let arr = [];
        res.on('data', buffer => {
            arr.push(buffer);
        });
        // 抓取图片
        res.on('end', () => {
            let buf = Buffer.concat(arr);
            success && success(buf);
        });
    });
    req.end();
    req.on('error',()=>{
        console.log('404了，哥们');
    })
}