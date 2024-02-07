const mongoose = require("mongoose");

//pass: ''
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`Mongodb connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB ${error.message} ` );
        process.exit(1);
    }
}

module.exports = connectDB;