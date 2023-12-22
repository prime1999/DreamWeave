// functions to calculate the rating percentage
// function to calculate five star ratings
export const fiveStarRating = (products: any) => {
	const productsAcc = products.reduce((acc: any, product: any) => {
		acc += product.rating;
		return acc;
	}, 0);
	const mappedProducts = products.filter(
		(product: any) => product.rating > 4.4
	);

	const sumProducts = mappedProducts.reduce((acc: any, product: any) => {
		acc += product.rating;

		return acc;
	}, 0);
	const productPercent = Math.ceil((sumProducts / productsAcc) * 100);

	return `${productPercent}%`;
};
// function to calculate four star ratings
export const fourStarRating = (products: any) => {
	const productsAcc = products.reduce((acc: any, product: any) => {
		acc += product.rating;
		return acc;
	}, 0);
	const mappedProducts = products.filter(
		(product: any) => product.rating < 4.4 && product.rating >= 3.5
	);

	const sumProducts = mappedProducts.reduce((acc: any, product: any) => {
		acc += product.rating;

		return acc;
	}, 0);
	const productPercent = Math.ceil((sumProducts / productsAcc) * 100);

	return `${productPercent}%`;
};
// function to calculate three star ratings
export const threeStarRating = (products: any) => {
	const productsAcc = products.reduce((acc: any, product: any) => {
		acc += product.rating;
		return acc;
	}, 0);
	const mappedProducts = products.filter(
		(product: any) => product.rating < 3.5 && product.rating >= 2.5
	);

	const sumProducts = mappedProducts.reduce((acc: any, product: any) => {
		acc += product.rating;

		return acc;
	}, 0);
	const productPercent = Math.ceil((sumProducts / productsAcc) * 100);

	return `${productPercent}%`;
};
// function to calculate two star ratings
export const twoStarRating = (products: any) => {
	const productsAcc = products.reduce((acc: any, product: any) => {
		acc += product.rating;
		return acc;
	}, 0);
	const mappedProducts = products.filter(
		(product: any) => product.rating < 2.5 && product.rating >= 1.5
	);

	const sumProducts = mappedProducts.reduce((acc: any, product: any) => {
		acc += product.rating;

		return acc;
	}, 0);
	const productPercent = Math.ceil((sumProducts / productsAcc) * 100);

	return `${productPercent}%`;
};
// function to calculate one star ratings
export const oneStarRating = (products: any) => {
	const productsAcc = products.reduce((acc: any, product: any) => {
		acc += product.rating;
		return acc;
	}, 0);
	const mappedProducts = products.filter(
		(product: any) => product.rating < 1.5 && product.rating >= 0.5
	);

	const sumProducts = mappedProducts.reduce((acc: any, product: any) => {
		acc += product.rating;

		return acc;
	}, 0);
	const productPercent = Math.ceil((sumProducts / productsAcc) * 100);

	return `${productPercent}%`;
};

// function to calculate the number of reviews on the products
export const calcReview = (products: any) => {
	const productReviews = products?.reduce((acc: any, product: any) => {
		acc += product.review.length;
		return acc;
	}, 0);
	return productReviews;
};
