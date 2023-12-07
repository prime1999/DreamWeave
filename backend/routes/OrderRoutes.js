import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserOrder, placeOrder } from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/placeOrder", protect, placeOrder);
OrderRouter.get("/", protect, getUserOrder);

export default OrderRouter;
