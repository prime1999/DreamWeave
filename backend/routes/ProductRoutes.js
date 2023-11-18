import express from "express";
import {
	getHighlyRatedProducts,
	getProducts,
} from "../controller/ProductController.js";

const ProductRouter = express.Router();

/*
GETPRODUCTS: GET public;
GETHIGHLYRATEDPRODUCTS: GET public;
*/

ProductRouter.get("/", getProducts);
ProductRouter.get("/highlyRated", getHighlyRatedProducts);

export default ProductRouter;
