const crawler = require('./crawler.js');
// const Topic = require('./topic.js');
// require('./mongo.js');
(async () => {
    let count = 0;
    for (let i = 0; i < 1000; i += 25) {
        let results = await crawler.fetchSingleDoubanList(i);
        for(let j=0;j<results.length;j++){
            // console.log(results[j].url);
           
            // let foundTopic = await Topic.findOne({url:results[j].url}).then(r=>r);
            // if(foundTopic) {
            //     count++;
            // }
            // else{
            //     await Topic.create(results[j]).then(r=>r);
            // }

            if(isNear(results[j].title)){
                console.log(results[j].url);
                let result = await crawler.fetchSingleDoubanTopic(results[j].url)
                console.log(result);
            }
        }
    }
    console.log(`count:${count}`);
})().then(r => {
    console.log('done');
    process.exit(0);
}).catch(e => {
    console.log(e);
    process.exit(1);
})


function isNear(location){
    return location.indexOf('陆家嘴') > -1;
}