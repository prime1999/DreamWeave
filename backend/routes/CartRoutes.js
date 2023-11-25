import express from "express";
import { addToCart } from "../controller/CartController.js";

const CartRouter = express.Router();

/*
GET CART ITEMS: GET public;
ADD TO CART:    POST public;
*/

//CartRouter.get("/", getProducts);
CartRouter.post("/", addToCart);

export default CartRouter;
