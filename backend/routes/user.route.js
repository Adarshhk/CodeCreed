import { Router } from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import { userInfo, userQuestions, userSubmissions } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.use(verifyJwt);
userRouter.get("/" , userInfo);
userRouter.get("/submissions" , userSubmissions);
userRouter.get("/questions" , userQuestions);

export default userRouter;