import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	getOneOrder,
	getUserOrder,
	placeOrder,
} from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/placeOrder", protect, placeOrder);
OrderRouter.get("/", protect, getUserOrder);
OrderRouter.get("/:orderId", protect, getOneOrder);

export default OrderRouter;
