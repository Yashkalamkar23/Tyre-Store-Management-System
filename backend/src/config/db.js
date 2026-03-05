import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const ConnectDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MOONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("Error Connecting to MOONGODB", error)
        process.exit(1);
    }

    }
    
export default ConnectDB;