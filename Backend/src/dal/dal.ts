// חיבור לדאטאבייס
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//פוקנצית חיבור לדאטאבייס 
export const connectToDatabase = async (): Promise<void> => {
    try {
      
        await mongoose.connect("mongodb+srv://yisroelgold3:KDl5gerHaHl1DowG@izyg.7q5uv.mongodb.net/test568");

        console.log("Connected to mongoDB");
        
    } catch (error) {
        console.error("Failed to connect to databadse", error)
    }
};
