import express from "express";
import { addToCart, getUserCart } from "../controller/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const CartRouter = express.Router();

/*
GET CART ITEMS: GET public;
ADD TO CART:    POST public;
*/

CartRouter.get("/", protect, getUserCart);
CartRouter.post("/addTocart", protect, addToCart);

export default CartRouter;
