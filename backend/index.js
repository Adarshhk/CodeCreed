import connectToDB from "./database/database.js";
import 'dotenv/config'
import path from 'path'
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import problemRouter from './routes/problem.route.js';

import cors from 'cors';

const __dirname = path.resolve();
const app = express();
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
    res.sendFile(path.join(__dirname  ,  "frontend" , "dist" , "index.html"));
})

const port = process.env.PORT;
connectToDB().then(app.listen(port , () => {
    console.log("app is listening on port" , port)
}))
