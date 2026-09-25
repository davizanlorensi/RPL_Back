import { DataTypes } from "sequelize";
import db from './index.cjs';

const Categories = db.sequelize.define("Categories", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Categories;