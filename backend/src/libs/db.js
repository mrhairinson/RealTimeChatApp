import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected host: ${conn.connection.host}`);
    } catch (error) {
        console.log(`ERROR in mongoDB connection:\n${error}`);
    }
}