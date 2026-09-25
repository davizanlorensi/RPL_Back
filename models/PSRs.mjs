import { DataTypes } from "sequelize";
import db from './index.cjs';

const PSRs = db.sequelize.define("Psrs", {
    AthleteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Recovery: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Sleep: {
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
    },
    Stress: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Urine: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default PSRs;