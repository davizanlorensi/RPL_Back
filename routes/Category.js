import express from "express";
import Categories from '../models/Categories.mjs';

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
    const list = await Categories.findAll();
    res.json(list);
})

export default categoryRouter;