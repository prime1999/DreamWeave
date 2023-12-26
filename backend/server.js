import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import ProductRouter from "./routes/ProductRoutes.js";
import CartRouter from "./routes/CartRoutes.js";
import UserRouter from "./routes/UserRoute.js";
import OrderRouter from "./routes/OrderRoutes.js";
import UploadRoute from "./routes/UploadRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

// connect to DB
connectDB();

// init express app
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// cookie parser middleware
app.use(cookieParser());

// routes
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/user", UserRouter);
app.use("/api/order", OrderRouter);
app.get("/api/config/paypal", (req, res) => {
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
app.use("/api/upload", UploadRoute);

// check if the app is in production,
if (process.env.NODE_ENV === "production") {
	// if yes, then:
	// get the current directory name of the app
	const __dirName = path.resolve();
	// get the uploads in the production folder and serve them as static file to '/uploads'
	app.use("/uploads", express.static("/var/data/uploads"));
	// serve the statis files in the '/frontend/build' path to the page
	app.use(express.static(path.join(__dirName, "/frontend/build")));
	// get the files under the route "*" and send it to the route below
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirName, "frontend", "build", "index.html"));
	});
} else {
	const __dirname = path.resolve();
	// serve the static file from the upload path in the current directory to the upload folder
	app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

// error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`App is running on port ${port}`));
