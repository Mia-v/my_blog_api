const mongoose = require ('mongoose');

let db;

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true });
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('MongoDB is connected...');
});

module.exports = () => db;