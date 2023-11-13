import express from "express";
import { getProducts } from "../controller/ProductController.js";

const ProductRouter = express.Router();

/*
GETPRODUCTS: GET public
*/

ProductRouter.get("/", getProducts);

export default ProductRouter;
