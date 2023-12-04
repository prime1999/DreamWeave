import express from "express";
import {
	addToCart,
	getUserCart,
	removeCartItem,
} from "../controller/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const CartRouter = express.Router();

/*
GET CART ITEMS: GET private;
ADD TO CART:    POST private;
REMOVE A CART ITEM: PATCH private;
*/

CartRouter.get("/", protect, getUserCart);
CartRouter.post("/addTocart", protect, addToCart);
CartRouter.patch("/removeItem", protect, removeCartItem);

export default CartRouter;
