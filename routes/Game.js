import express from "express";
import Games from '../models/Games.mjs';
import { Op } from "sequelize";

const gameRouter = express.Router();

gameRouter.get("/", async (req, res) => {
    const list = await Games.findAll();
    res.json(list);
})

gameRouter.get("/:id", async (req, res) => {
    const session = await Games.findByPk(req.params.id);
    res.json(session);
})

gameRouter.get("/getByCategory/:categoryId", async (req, res) => {
    const list = await Games.findAll({
        where: { categoryId: req.params.categoryId },
        order: [['day', 'DESC']]
    });
    res.json(list);
})

gameRouter.post("/", async (req, res) => {
    const game = req.body;

    const count = await Games.count({
        where: {
            day: game.Day.split('T')[0],
            categoryId: game.CategoryId,
            id: {
                [Op.ne]: game.Id,
            },
        }
    });

    if (count > 0) {
        res.status(550).json(game);
        return;
    }

    await Games.upsert(game);
    res.json(game);
})

gameRouter.delete("/:id", async (req, res) => {
    await Games.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json({});
})

export default gameRouter;