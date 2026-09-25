import { DataTypes } from "sequelize";
import db from './index.cjs';

const GameAthletes = db.sequelize.define("GameAthletes", {
    AthleteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    GameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MinutesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Payed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Number: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default GameAthletes;