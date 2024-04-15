import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "./utils/logger.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import userRouter from "./routes/userRoute.js"

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

// Add all routes here
//app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter )

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})