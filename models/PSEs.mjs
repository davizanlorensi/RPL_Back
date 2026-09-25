import { DataTypes } from "sequelize";
import db from './index.cjs';

const PSEs = db.sequelize.define("Pses", {
    AthleteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Exertion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Pain: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PainPlace: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default PSEs;