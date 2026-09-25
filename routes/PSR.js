import express from "express";
import PSRs from '../models/PSRs.mjs';
import { QueryTypes } from "sequelize";
import db from '../models/index.cjs';
import { getPhoto } from "./Athlete.js";

const psrRouter = express.Router();

psrRouter.get("/", async (req, res) => {
    const list = await PSRs.findAll();
    res.json(list);
})

psrRouter.get("/getByDay/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT * FROM Psrs P 
                JOIN Athletes A ON A.Id = P.AthleteId WHERE DATE(P.Date) = :date AND A.CategoryId = :categoryId`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                date: req.params.day
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

psrRouter.get("/getAlerts/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT *, A.Id AS AthleteId FROM Athletes A 
            LEFT JOIN Psrs P ON A.Id = P.AthleteId AND (DATE(P.Date) = :date OR P.Date IS NULL) 
            WHERE A.CategoryId = :categoryId AND A.Active = 1`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                date: req.params.day
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

psrRouter.get("/getForms/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT *, A.Id AS AthleteId FROM Athletes A 
            LEFT JOIN Psrs P ON A.Id = P.AthleteId AND (DATE(P.Date) = :date OR P.Date IS NULL) 
            WHERE A.CategoryId = :categoryId AND A.Active = 1`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                date: req.params.day
            },
            type: QueryTypes.SELECT
        }
    );

    list.forEach(x => {
        x.Photo = getPhoto(x.AthleteId);
    });

    res.json(list);
})

psrRouter.post("/", async (req, res) => {
    const post = req.body;
    await PSRs.create(post);
    res.json(post);
})

export default psrRouter;