import { DataTypes } from "sequelize";
import db from './index.cjs';

const Athletes = db.sequelize.define("Athletes", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Athletes;