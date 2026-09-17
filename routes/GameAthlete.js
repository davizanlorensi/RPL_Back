import express from "express";
import GameAthletes from '../models/GameAthletes.mjs';

const gameAthleteRouter = express.Router();

gameAthleteRouter.get("/", async (req, res) => {
    const list = await GameAthletes.findAll();
    res.json(list);
})

export default gameAthleteRouter;