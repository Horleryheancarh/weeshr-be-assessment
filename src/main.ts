import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import { errorHandler } from "./middlewares/error";
import { MONGO_DB_URL, PORT } from "./config";
import mongoose from "mongoose";
import AuthorRoutes from "./routes/author.route";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_DB_URL)
  .then(() => console.log('Database connected'))
  .catch((error) => console.error(error));

//  Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/api/v1/author", AuthorRoutes);

// Error Handler
app.use(errorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
