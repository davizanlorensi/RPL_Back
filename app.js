import express from "express";
import db from './models/index.cjs';
import categoryRouter from "./routes/Category.js";
import pseRouter from "./routes/PSE.js";
import sessionRouter from "./routes/Session.js";
import cors from 'cors'
import psrRouter from "./routes/PSR.js";
import athleteRouter from "./routes/Athlete.js";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/pse", pseRouter);
app.use("/psr", psrRouter);
app.use("/session", sessionRouter);
app.use("/athlete", athleteRouter);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando com sucesso", process.env.PORT || 3000));
}).catch((e) => {
    console.log(e);
});