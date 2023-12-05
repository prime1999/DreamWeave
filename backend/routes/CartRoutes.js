import express from "express";
import {
	addToCart,
	clearAllItems,
	getUserCart,
	removeCartItem,
} from "../controller/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const CartRouter = express.Router();

/*
GET CART ITEMS: GET private;
ADD TO CART:    POST private;
REMOVE A CART ITEM: PATCH private;
CLEAR USER'S CART: DELETE private;
*/

CartRouter.get("/", protect, getUserCart);
CartRouter.post("/addTocart", protect, addToCart);
CartRouter.patch("/removeItem", protect, removeCartItem);
CartRouter.delete("/clearCart", protect, clearAllItems);

export default CartRouter;
