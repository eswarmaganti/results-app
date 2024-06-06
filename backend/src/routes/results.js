import { Router } from "express";
import {getResultsController} from "../controllers/results.js"


const resultsRouter = Router()

resultsRouter.get("/results",getResultsController);

export default resultsRouter;
