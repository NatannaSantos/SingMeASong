import { Router } from "express";
import e2eController from "../controllers/e2eController.js";


const e2eRouter = Router();

e2eRouter.post("/reset", e2eController.resetDatabase);
e2eRouter.post("/seed", e2eController.seed);

export default e2eRouter;
