import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const RFQ = sequelize.define(
  "RFQ",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productName: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    deliveryLocation: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("OPEN", "CLOSED"),
      allowNull: false,
      defaultValue: "OPEN",
    },
  },
  {
    tableName: "rfqs",
    timestamps: true,
  }
);

export default RFQ;