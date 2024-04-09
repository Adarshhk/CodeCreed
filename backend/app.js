import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import problemRouter from './routes/problem.route.js';
import path from 'path'
import cors from 'cors';

const app = express();
const __dirname = path.resolve();
app.use(cors({
    origin : '*'
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);
app.use("/api/problem" , problemRouter);
app.use(express.static(path.join(__dirname , "/frontend/dist")))

app.get("*" , (req , res) => {
    res.sendFile(path.join(__dirname  ,  "frontend" , "dist" , "index.html"))
})
export default app;
