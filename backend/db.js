// Use to connect with database
const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://inotebook:connect@inotebook.zrpvbmj.mongodb.net/test'
//const mongouri = 'mongodb://localhost:27017/inotebook';
const connectToMongo = async ()=>{
    await mongoose.connect(mongouri);
}
module.exports = connectToMongo;