import express from "express";
import {
	addProduct,
	deleteProduct,
	getAllProducts,
	getHighlyRatedProducts,
	getProducts,
	getProductsByCategory,
	getProductsWithSimilarCategory,
	getSingleProduct,
	updateProduct,
} from "../controller/ProductController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const ProductRouter = express.Router();

/*
GETPRODUCTS: GET public;
GETHIGHLYRATEDPRODUCTS: GET public;
GETSINGLEPRODUCT: GET public;
ADDPRODUCT: POST private admin
*/

ProductRouter.get("/", getProducts);
ProductRouter.get("/allProducts", getAllProducts);
ProductRouter.get("/highlyRated", getHighlyRatedProducts);
ProductRouter.get("/:productId", getSingleProduct);
ProductRouter.get("/category/:category", getProductsByCategory);
ProductRouter.get(
	"/category/similar/:productId",
	getProductsWithSimilarCategory
);
ProductRouter.post("/product/add", protect, admin, addProduct);
ProductRouter.delete("/delete/:id", protect, admin, deleteProduct);
ProductRouter.put("/update/product/:id", protect, admin, updateProduct);

export default ProductRouter;
