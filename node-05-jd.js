const fs = require('fs');
const path = require('path');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM;

let index = 0;
getUrl('https://item.jd.com/1150551.html', 
data => {
    let html = gbk.toString('utf-8',data);
    let DOM = new JSDOM(html);
    let document = DOM.window.document;
    console.log(document.querySelector('.comment').innerHTML.trim());
    fs.writeFile(path.join(__dirname,'download','jd.html'),html,(err)=>{
        console.log('终于走出来了');
        if(err) throw err;
        console.log('文件保存成功');
    });
});

function getUrl(sUrl, success) {
    index++;
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
        if(res.statusCode === 200){
            console.log(res.statusCode);
            let arr = [];
            res.on('data', buffer => {
                arr.push(buffer);
            });
            // 抓取图片
            res.on('end', () => {
                let buf = Buffer.concat(arr);
                success && success(buf);
            });
        }else if(res.statusCode === 302 || res.statusCode === 301){
            console.log(`这是第${index}次重定向`,res.headers.location);
            getUrl(res.headers.location,success);
        }
    });
    req.end();
    req.on('error',()=>{
        console.log('404了，哥们');
    })
}