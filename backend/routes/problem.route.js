import { Router } from "express";
import { addProblem, getAll, getProblem, submitProblem } from "../controller/problem.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";

const problemRouter = Router();

problemRouter.use(verifyJwt)

problemRouter.get("/" , getAll);
problemRouter.get("/question/:id" , getProblem);
problemRouter.post("/question/:id" , submitProblem);
problemRouter.post("/add" , addProblem);


export default problemRouter;