import { DataTypes } from "sequelize";
import db from './index.cjs';

const PSEs = db.sequelize.define("Pses", {
    AthleteId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Exertion: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Pain: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    PainPlace: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default PSEs;