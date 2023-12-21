import express from "express";
import {
	getAllProducts,
	getHighlyRatedProducts,
	getProducts,
	getProductsByCategory,
	getSingleProduct,
} from "../controller/ProductController.js";

const ProductRouter = express.Router();

/*
GETPRODUCTS: GET public;
GETHIGHLYRATEDPRODUCTS: GET public;
GETSINGLEPRODUCT: GET public
*/

ProductRouter.get("/", getProducts);
ProductRouter.get("/allProducts", getAllProducts);
ProductRouter.get("/highlyRated", getHighlyRatedProducts);
ProductRouter.get("/:productId", getSingleProduct);
ProductRouter.get("/category/:productId", getProductsByCategory);

export default ProductRouter;
