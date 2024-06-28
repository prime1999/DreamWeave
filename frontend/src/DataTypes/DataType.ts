import { ProductType } from "./ProductType";

export interface DataType {
	products: ProductType[];
	category: string;
	page: number;
	pages: number;
}
