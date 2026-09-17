import { DataTypes } from "sequelize";
import db from './index.cjs';

const Athletes = db.sequelize.define("Athletes", {
    Id: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Athletes;