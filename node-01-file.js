const http = require('http');
const fs = require('fs');

let req = http.request({
    'hostname':'nodejs.cn',
    'path':'/download/'
},res =>{
    let retArr = [];
    res.on('data', buffer => {
        retArr.push(buffer);
    });
    // 抓取文件
    res.on('end',()=>{
       fs.writeFile('download.html',retArr,'utf-8',(err)=>{
           if(err) throw err;
           console.log("文件已保存");
       });
    });
});

req.end();