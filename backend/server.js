import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ProductRouter from "./routes/ProductRoutes.js";
import CartRouter from "./routes/CartRoutes.js";
import UserRouter from "./routes/UserRoute.js";
dotenv.config();

const port = process.env.PORT || 5000;

// connect to DB
connectDB();

// init express app
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// routes
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/user", UserRouter);

// error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`App is running on port ${port}`));
