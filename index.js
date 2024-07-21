import express from "express";
import swagger from "swagger-ui-express";
import dotenv from "dotenv";
import path from "path";
import {
  errorHandlerMiddleware,
} from "./middlewares/errorHandlerMiddleware.js";
import questionsRoutes from "./src/questions/routes/question.routes.js";
import optionsRoutes from "./src/options/routes/options.routes.js";
import apiDocs from "./swagger.json" assert { type: "json" };

const configPath = path.resolve("config", "uat.env");
dotenv.config({ path: configPath });

const app = express();
app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// configure routes
app.use("/api/questions", questionsRoutes);
app.use("/api/options", optionsRoutes);

// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

export default app;
