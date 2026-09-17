import express from "express";
import Athletes from '../models/Athletes.mjs';

const athleteRouter = express.Router();

athleteRouter.get("/", async (req, res) => {
    const list = await Athletes.findAll();
    res.json(list);
})

athleteRouter.get("/getByCategory/:categoryId", async (req, res) => {
    const list = await Athletes.findAll({
        where: {
            categoryId: req.params.categoryId
        }
    });
    res.json(list);
})

export default athleteRouter;