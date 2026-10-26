import { DataTypes } from "sequelize";
import db from './index.cjs';

const Games = db.sequelize.define("Games", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Day: {
        type: DataTypes.DATEONLY,
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