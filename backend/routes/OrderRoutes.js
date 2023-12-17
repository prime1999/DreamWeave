import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	deleteOrder,
	getOneOrder,
	getUserOrder,
	payOrder,
	placeOrder,
	updateShippingAddress,
} from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/placeOrder", protect, placeOrder);
OrderRouter.get("/", protect, getUserOrder);
OrderRouter.get("/:orderId", protect, getOneOrder);
OrderRouter.put("/payOrder/:orderId", protect, payOrder);
OrderRouter.put("/updateOrder/:orderId", protect, updateShippingAddress);
OrderRouter.delete("/deleteOrder/:orderId", protect, deleteOrder);

export default OrderRouter;
