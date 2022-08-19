import mongoose from "mongoose";
import config from "config";
import { log as logger } from "./logger";
import { DbSettings } from "../models";

export const mongoDbConnect = async () => {
  const dbSettings = config.get<DbSettings>("db");

  try {
    await mongoose.connect(
      `mongodb+srv://${dbSettings.user}:${encodeURIComponent(dbSettings.password)}@cluster0.89ia9.mongodb.net/?retryWrites=true&w=majority`);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
    
    logger.info("DB Connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
