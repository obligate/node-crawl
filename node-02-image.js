const http = require('http');
const fs = require('fs');
const path = require('path');

// http://www.clevaly.com/img/vi_ues.gif
let req = http.request({
    'hostname':'www.clevaly.com',
    'path':'/img/vi_ues.gif'
},res=>{ // 默认发起的是post请求
    let arr = [];
    res.on('data',buffer=>{
        arr.push(buffer);
    });
    // 抓取图片
    res.on('end',()=>{
        // console.log(Buffer);
        let buf = Buffer.concat(arr);
        fs.writeFile(path.join(__dirname,'download','vi_ues.gif'),buf,'utf8',(err)=>{
            if(err) throw err;
            console.log('文件保存成功');
        });
    })
});

req.end();