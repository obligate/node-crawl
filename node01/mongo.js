const mongoose = require('mongoose');
const db_url = "mongodb://localhost:27017/rent_crawler";
mongoose.createConnection(dburl,{
    server:{poolsize:5}
})
const db = mongoose.connection;

db.on('connected',function(){
    console.log('Mongoose connection open to ' + db_url);
});

db.on('error',err => {
    console.log('Mongoose connection error ' + err);
});

db.on('disconnected',() => {
    console.log('Mongoose connection disconnected ' );
});


module.exports = mongoose;