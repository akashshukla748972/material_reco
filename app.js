import express from "express";
import cors from "cors";

import errorHandler from "./src/middlewares/errorHandler.js";
import indexRouter from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", indexRouter);

app.use(errorHandler);

export default app;
