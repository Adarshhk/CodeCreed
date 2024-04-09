import { Router } from "express";
import { userLogin, userLogout, userSignup } from "../controller/auth.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";

const authRouter = Router();

authRouter.post("/login" , userLogin);
authRouter.post("/signup" , userSignup);
authRouter.post("/logout" , verifyJwt , userLogout);

export default authRouter;