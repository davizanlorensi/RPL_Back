import { DataTypes } from "sequelize";
import db from './index.cjs';

const PSRs = db.sequelize.define("Psrs", {
    AthleteId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Recovery: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Sleep: {
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
    },
    Stress: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    Urine: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
});

export default PSRs;