import { DataTypes } from "sequelize";
import db from './index.cjs';

const Sessions = db.sequelize.define("Sessions", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    StartTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    EndTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Day: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Pause: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PlannedLoad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Sessions;