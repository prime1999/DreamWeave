import express from "express";
import { addToCart } from "../controller/CartController.js";
import { protect } from "../middleware/authMiddleware.js";

const CartRouter = express.Router();

/*
GET CART ITEMS: GET public;
ADD TO CART:    POST public;
*/

//CartRouter.get("/", getProducts);
CartRouter.post("/addTocart", protect, addToCart);

export default CartRouter;
