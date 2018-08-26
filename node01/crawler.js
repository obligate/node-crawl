const axios = require('axios');
//jsdom
//phantomjs
const cheerio = require('cheerio');
// const jieba = require('nodejieba');


async function fetchSingleDoubanList(start){
    let res = await axios.get(`https://www.douban.com/group/shanghaizufang/discussion?start=${start}`);
    let htmlText = res.data;

    const $ = cheerio.load(htmlText);
    const rs = $('a[title]');

    const resultList = [];
    for(let i = 0; i < rs.length; i++){
       resultList.push({
           title:rs.eq(i).attr('title'),
           url:rs.eq(i).attr('href'),
       }); 
    }
    // console.log(resultList.length);
    return resultList;
}

async function fetchSingleDoubanTopic(url){
    let res = await axios.get(url);
    let htmlText = res.data;
    
    const $ = cheerio.load(htmlText);
    const ps = $('.topic-richtext > p');
    // console.log(ps.length);
    let details = [];
    for(let i=0;i<ps.length;i++){
        details.push(ps.eq(i).text());
        // console.log(ps.eq(i).text());
    }
    // console.log(topicBody);


    const topicPics = $('.topic-richtext > img');
    let pics = [];
    for(let i=0;i<topicPics.length;i++){
        pics.push(topicPics.eq(i).attr('src'));
    }

    return {
        details,
        pics,
    }
}

module.exports = {
    fetchSingleDoubanList,
    fetchSingleDoubanTopic,
}
