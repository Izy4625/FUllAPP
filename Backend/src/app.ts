import  express  from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./dal/dal";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter"
import candidateRouter from "./routes/candidateRouter";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectToDatabase();
app.use("/auth", authRouter);
app.use("/user",userRouter);
app.use("/cand",candidateRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log('server is running on port' + PORT);
    
})
