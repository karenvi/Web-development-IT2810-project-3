import 'dotenv/config';
import mongoose from 'mongoose';
const uri = process.env.DB_URL;
export async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("🎉 Connected to database successfully");
    }
    catch (err) {
        console.log(uri);
        console.log(err);
        return err;
    }
}
