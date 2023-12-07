import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { placeOrder } from "../controller/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/placeOrder", protect, placeOrder);

export default OrderRouter;
