import express from "express";
import Games from '../models/Games.mjs';

const gameRouter = express.Router();

gameRouter.get("/", async (req, res) => {
    const list = await Games.findAll();
    res.json(list);
})

export default gameRouter;