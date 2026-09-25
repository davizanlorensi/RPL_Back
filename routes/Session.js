import express from "express";
import Sessions from '../models/Sessions.mjs';
import { QueryTypes } from "sequelize";
import db from '../models/index.cjs';
import { getStartOfWeek1, getEndOfWeek1, getStartOfWeek2, getEndOfWeek2, getStartOfWeek3, getEndOfWeek3, getStartOfWeek4, getEndOfWeek4, getStartOfCurrentWeek, getEndOfCurrentWeek, getMonday, getTuesday, getWednesday, getThursday, getFriday, getStartOfMonth, getEndOfMonth } from "../dates.js";

const sessionRouter = express.Router();

sessionRouter.get("/", async (req, res) => {
    const list = await Sessions.findAll();
    res.json(list);
})

sessionRouter.get("/average/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:startCW) AND DATE(:endCW) AND C.Id = :categoryId) AS CurrentTotal,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:startCW) AND DATE(:endCW) AND C.Id = :categoryId) AS CurrentEffective,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start1W) AND DATE(:end1W) AND C.Id = :categoryId) AS FirstWTotal,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start1W) AND DATE(:end1W) AND C.Id = :categoryId) AS FirstWEffective,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start2W) AND DATE(:end2W) AND C.Id = :categoryId) AS SecondWTotal,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start2W) AND DATE(:end2W) AND C.Id = :categoryId) AS SecondWEffective,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start3W) AND DATE(:end3W) AND C.Id = :categoryId) AS ThirdWTotal,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start3W) AND DATE(:end3W) AND C.Id = :categoryId) AS ThirdWEffective,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start4W) AND DATE(:end4W) AND C.Id = :categoryId) AS FourthWTotal,
                (SELECT AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) BETWEEN DATE(:start4W) AND DATE(:end4W) AND C.Id = :categoryId) AS FourthWEffective`,
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

sessionRouter.get("/weekAverage/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:monday) AND C.Id = :categoryId) AS MonTotal,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:monday) AND C.Id = :categoryId) AS MonEffective,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:tuesday) AND C.Id = :categoryId) AS TueTotal,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:tuesday) AND C.Id = :categoryId) AS TueEffective,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:wednesday) AND C.Id = :categoryId) AS WedTotal,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:wednesday) AND C.Id = :categoryId) AS WedEffective,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:thursday) AND C.Id = :categoryId) AS ThuTotal,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:thursday) AND C.Id = :categoryId) AS ThuEffective,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:friday) AND C.Id = :categoryId) AS FriTotal,
                (SELECT TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause FROM Sessions S JOIN Categories C ON C.Id = S.CategoryId 
                    WHERE DATE(S.Day) = DATE(:friday) AND C.Id = :categoryId) AS FriEffective`,
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

sessionRouter.get("/magnitude/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT YEARWEEK(S.Day, 3) AS Day,
                AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) AS TotalVolume, 
                AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime) - Pause) AS EffectiveVolume, 
                (SELECT AVG(P.Exertion) FROM Pses P 
                        JOIN Athletes A ON A.Id = P.AthleteId 
                    WHERE DATE(P.Date) BETWEEN DATE(:startM) AND DATE(:endM) AND A.CategoryId = :categoryId AND YEARWEEK(P.Date, 3) = YEARWEEK(S.Day, 3)
                    GROUP BY YEARWEEK(P.Date, 3)) AS Exertion,
                (SELECT AVG(P.Exertion) * (AVG(TIMESTAMPDIFF(MINUTE, SE.StartTime, SE.EndTime) - SE.Pause)) FROM Pses P 
                        JOIN Athletes A ON A.Id = P.AthleteId 
                        JOIN Sessions SE ON SE.CategoryId = A.CategoryId
                    WHERE DATE(SE.Day) BETWEEN DATE(:startM) AND DATE(:endM) AND DATE(P.Date) BETWEEN DATE(:startM) AND DATE(:endM) 
                    AND A.CategoryId = :categoryId AND YEARWEEK(SE.Day, 3) = YEARWEEK(S.Day, 3) AND YEARWEEK(P.Date, 3) = YEARWEEK(S.Day, 3)) AS TRIMP
            FROM Sessions S 
            WHERE DATE(S.Day) 
            BETWEEN DATE(:startM) AND DATE(:endM) AND S.CategoryId = :categoryId 
            GROUP BY YEARWEEK(S.Day, 3), Exertion, TRIMP ORDER BY YEARWEEK(S.Day, 3)`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                startM: getStartOfMonth(new Date(req.params.week + 'T00:00:00')),
                endM: getEndOfMonth(new Date(req.params.week + 'T00:00:00'))
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

sessionRouter.get("/weekMagnitude/:categoryId/:week", async (req, res) => {
    const list = await db.sequelize.query(
        `SELECT S.Type,
                S.Day, 
                S.PlannedLoad, 
                AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) AS TotalVolume, 
                AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) - Pause AS EffectiveVolume, 
                AVG(P.Exertion) AS Exertion,
                AVG(P.Exertion) * (AVG(TIMESTAMPDIFF(MINUTE, S.StartTime, S.EndTime)) - Pause) AS TRIMP
            FROM Sessions S 
            JOIN Athletes A ON A.CategoryId = S.CategoryId
            JOIN Pses P ON DATE(P.Date) = DATE(S.Day) AND A.Id = P.AthleteId
            WHERE DATE(S.Day) 
            BETWEEN DATE(:startW) AND DATE(:endW) AND S.CategoryId = :categoryId 
            GROUP BY P.Date, S.Day, S.PlannedLoad, S.Pause, S.Type ORDER BY S.Day`,
        {
            replacements: {
                categoryId: req.params.categoryId,
                startW: getStartOfCurrentWeek(new Date(req.params.week + 'T00:00:00')),
                endW: getEndOfCurrentWeek(new Date(req.params.week + 'T00:00:00'))
            },
            type: QueryTypes.SELECT
        }
    );

    res.json(list);
})

export default sessionRouter;