import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
	deleteOrder,
	getOneOrder,
	getOrders,
	getSalesRevenue,
	getStatusOrder,
	getUserOrder,
	payOrder,
	placeOrder,
	updateOrderStatus,
	updateShippingAddress,
} from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/placeOrder", protect, placeOrder);
OrderRouter.get("/", protect, getUserOrder);
OrderRouter.get("/all", protect, getOrders);
OrderRouter.get("/statusOrder/:status", protect, admin, getStatusOrder);
OrderRouter.get("/:orderId", protect, getOneOrder);
OrderRouter.put("/payOrder/:orderId", protect, payOrder);
OrderRouter.put("/updateOrder/:orderId", protect, updateShippingAddress);
OrderRouter.put("/update/status/:id", protect, admin, updateOrderStatus);
OrderRouter.delete("/deleteOrder/:orderId", protect, deleteOrder);
OrderRouter.get("/sales/totalRevenue", protect, getSalesRevenue);

export default OrderRouter;
