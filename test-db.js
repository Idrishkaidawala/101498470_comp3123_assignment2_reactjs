const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error(err);
        process.exit(1);
    });
