import { DataTypes } from "sequelize";
import db from './index.cjs';

const Games = db.sequelize.define("Games", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Pause: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Games;