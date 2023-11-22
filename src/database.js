const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/celebraya';

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI, {
    autoIndex: true
});

const connection = mongoose.connection;

connection.once('open', (err, ok) => {
    if(err) {
        console.log(`💥 There was an error in the database`);
        return
    }
    console.log(`🛢 Database Ready`);
});