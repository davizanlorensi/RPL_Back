import express from "express";
import PSEs from '../models/PSEs.mjs';
import { QueryTypes } from "sequelize";
import db from '../models/index.cjs';
import { getStartOfWeek1, getEndOfWeek1, getStartOfWeek2, getEndOfWeek2, getStartOfWeek3, getEndOfWeek3, getStartOfWeek4, getEndOfWeek4, getStartOfCurrentWeek, getEndOfCurrentWeek, getMonday, getTuesday, getWednesday, getThursday, getFriday } from "../dates.js";
import { getPhoto } from "./Athlete.js";

const pseRouter = express.Router();

pseRouter.get("/", async (req, res) => {
    const list = await PSEs.findAll();
    res.json(list);
})

pseRouter.get("/average/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) BETWEEN DATE(:startCW) AND DATE(:endCW) AND C.Id = :categoryId) AS CurrentW,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) BETWEEN DATE(:start1W) AND DATE(:end1W) AND C.Id = :categoryId) AS FirstW,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) BETWEEN DATE(:start2W) AND DATE(:end2W) AND C.Id = :categoryId) AS SecondW,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) BETWEEN DATE(:start3W) AND DATE(:end3W) AND C.Id = :categoryId) AS ThirdW,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) BETWEEN DATE(:start4W) AND DATE(:end4W) AND C.Id = :categoryId) AS FourthW`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                startCW: getStartOfCurrentWeek(new Date(req.params.week + 'T00:00:00')),
                endCW: getEndOfCurrentWeek(new Date(req.params.week + 'T00:00:00')),
                start1W: getStartOfWeek1(new Date(req.params.week + 'T00:00:00')),
                end1W: getEndOfWeek1(new Date(req.params.week + 'T00:00:00')),
                start2W: getStartOfWeek2(new Date(req.params.week + 'T00:00:00')),
                end2W: getEndOfWeek2(new Date(req.params.week + 'T00:00:00')),
                start3W: getStartOfWeek3(new Date(req.params.week + 'T00:00:00')),
                end3W: getEndOfWeek3(new Date(req.params.week + 'T00:00:00')),
                start4W: getStartOfWeek4(new Date(req.params.week + 'T00:00:00')),
                end4W: getEndOfWeek4(new Date(req.params.week + 'T00:00:00'))
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

pseRouter.get("/weekAverage/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) = DATE(:monday) AND C.Id = :categoryId) AS Monday,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) = DATE(:tuesday) AND C.Id = :categoryId) AS Tuesday,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) = DATE(:wednesday) AND C.Id = :categoryId) AS Wednesday,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) = DATE(:thursday) AND C.Id = :categoryId) AS Thursday,
                (SELECT AVG(P.Exertion) FROM Pses P JOIN Athletes A ON A.Id = P.AthleteId JOIN Categories C ON C.Id = A.CategoryId 
                    WHERE Date(P.Date) = DATE(:friday) AND C.Id = :categoryId) AS Friday`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                monday: getMonday(new Date(req.params.week + 'T00:00:00')),
                tuesday: getTuesday(new Date(req.params.week + 'T00:00:00')),
                wednesday: getWednesday(new Date(req.params.week + 'T00:00:00')),
                thursday: getThursday(new Date(req.params.week + 'T00:00:00')),
                friday: getFriday(new Date(req.params.week + 'T00:00:00'))
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

pseRouter.get("/getByDay/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT * FROM Pses P 
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

pseRouter.get("/getAlerts/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT *, A.Id AS AthleteId FROM Athletes A 
            LEFT JOIN Pses P ON A.Id = P.AthleteId AND (DATE(P.Date) = :date OR P.Date IS NULL) 
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

pseRouter.get("/getForms/:categoryId/:day", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT *, A.Id AS AthleteId FROM Athletes A 
            LEFT JOIN Pses P ON A.Id = P.AthleteId AND (DATE(P.Date) = :date OR P.Date IS NULL) 
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

pseRouter.post("/", async (req, res) => {
    const post = req.body;
    await PSEs.create(post);
    res.json(post);
})

export default pseRouter;