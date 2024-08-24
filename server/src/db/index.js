
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connInst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected!!!! Db Host:: ${connInst.connection.host}\n`);
    } catch (error) {
        console.error("Error IN CONNECTION OF MONGODB:", error);
        process.exit(1);
    }
}

export default connectDB;
