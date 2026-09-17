import { DataTypes } from "sequelize";
import db from './index.cjs';

const GameAthletes = db.sequelize.define("GameAthletes", {
    AthleteId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    GameId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    MinutesPlayed: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    Payed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Number: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
});

export default GameAthletes;