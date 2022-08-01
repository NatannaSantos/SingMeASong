import { Request, Response } from "express";
import { recommendationService } from "../services/recommendationsService.js";

async function resetDatabase(req: Request, res: Response) {
  await recommendationService.truncate();

  res.sendStatus(200);
}

export default {
    resetDatabase
} 
    