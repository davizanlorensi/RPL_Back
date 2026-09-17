import { DataTypes } from "sequelize";
import db from './index.cjs';

const Games = db.sequelize.define("Games", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Pause: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
});

export default Games;