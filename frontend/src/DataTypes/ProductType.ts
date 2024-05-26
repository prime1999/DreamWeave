export interface ProductType {
	_id: string;
	user: string;
	name: string;
	image: string;
	brand: string;
	category: string[];
	description: string;
	rating: number;
	numReviews: number;
	price: number;
	countInStock?: number;
	review?: any[];
	createdAt?: Date;
	updatedAt?: Date;
	qty?: number;
	isPaid?: boolean;
}
