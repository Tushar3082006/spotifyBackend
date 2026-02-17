const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected Successfully");
    } catch (error) {
        console.error(" Database connection erro:" , error);
    }
}

module.exports = connectDb;