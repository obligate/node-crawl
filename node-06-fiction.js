const fs = require('fs');
const path = require('path');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM;
// 分词
const Segment = require('segment');
let seg = new Segment();
seg.useDefault();

let index = 0;
getUrl('https://www.xs8.cn/chapter/7667979903133901/20583576887102092', 
data => {
    // let html = gbk.toString('utf-8',data);
    let DOM = new JSDOM(data.toString());
    let document = DOM.window.document;
    let content = document.querySelector('.read-content').innerHTML.replace(/<[^>]+>/g,'');
    // console.log(content);
    let segArr = seg.doSegment(content);
    // console.log(segArr);

    // 去掉没用的
    let myarr = [];
    segArr.forEach(data => {
        if(data.p !== 2048){
            myarr.push(data.w);
        }
    });
    // console.log(myarr);
    // 计算个数
    let myjson = {};
    myarr.forEach(data=>{
        if(!myjson[data]){
            myjson[data] = 1;
        }else{
            myjson[data]++;
        }
    });
    // console.log(myjson);
    // 去掉一次的
    let arr2  = [];
    for(let word in myjson){
        if(myjson[word]<=1){
            continue;
        }
        arr2.push({
            w:word,
            c:myjson[word]
        });
    }
    //排序
    arr2.sort((json1,json2)=>json2.c-json1.c);
    console.log(arr2);

    // console.log(data.toString());
    fs.writeFile(path.join(__dirname,'download','yq.html'),data,(err)=>{
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