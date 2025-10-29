import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize("foodies", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
