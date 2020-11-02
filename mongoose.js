const mongoose = require ('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('MongoDB is connected...');
});

module.exports = () => db;
