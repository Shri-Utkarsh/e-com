const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Product.countDocuments();
        console.log(`Total Products: ${count}`);
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkDB();
