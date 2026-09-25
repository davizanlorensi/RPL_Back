import express from "express";
import Athletes from '../models/Athletes.mjs';
import fs from 'fs';

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

athleteRouter.get("/getPhoto/:id", async (req, res) => {
    const photo = { uri: '' };
    var bitmap = fs.readFileSync(`photos/${req.params.id}.webp`);
    let b64string = new Buffer.from(bitmap).toString('base64');
    photo.uri = b64string;
    res.json(bitmap);
})

export var getPhoto = (id) => {
    try {
        var bitmap = fs.readFileSync(`photos/${id}.webp`);
        let b64string = new Buffer.from(bitmap).toString('base64');
        return b64string;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export default athleteRouter;