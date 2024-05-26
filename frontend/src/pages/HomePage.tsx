import { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import {
	useGetHighlyRatedProductsQuery,
	useGetProductsQuery,
} from "@/slices/ProductSlice";
import Paginate from "@/components/Paginate";
import { useParams } from "react-router-dom";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";
import Loader from "@/components/Loader";
import TopRated from "@/layouts/TopRated";
import ProductCategoryUI from "@/components/ProductCategoryUI";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const HomePage = () => {
	// state for the products and the value of the brand
	const [value, setValue] = useState<string>("");
	const [productsData, setProductsData] = useState<any>([]);

	const { pageNumber } = useParams();
	const { data, isLoading: loadingProducts } = useGetProductsQuery({
		pageNumber,
	});
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

	const { cartItems } = useSelector((state: any) => state.cart);

	useEffect(() => {
		// init a result variable to an empty array
		let result: any[] = [];
		// check if there is a value and there is data
		if (value && data?.products) {
			// if yes, then filter out the data that has the sam brand as the value passed in and store them in the reult array
			value === "all"
				? data?.products?.map((product: any) => result.push(product))
				: data?.products.filter(
						(product) => product.brand === value && result.push(product)
				  );
		} else {
			// if no, then there is not value, store the whole data in the result array
			data?.products?.map((product: any) => result.push(product));
		}
		// set the products to the result array
		setProductsData(result);
	}, [data, value]);

	return (
		<div>
			<Hero />
			<div className="relative container mx-auto my-8 w-11/12">
				<TopRated />
				{loadingProducts && <Loader />}
				{data && (
					<>
						{/* <Sorting setValue={setValue} data={data.products} /> */}
						<div className="mt-8">
							<h6 className="font-poppins text-lg font-medium text-center mt-16">
								Popular Now
							</h6>
							<div className="flex justify-center items-center mx-auto">
								<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{productsData.map((product: any) => (
										<Suspense key={product._id} fallback={<CardSkeleton />}>
											<ProductCard cart={cartItems} product={product} />
										</Suspense>
									))}
								</div>
							</div>
						</div>
						<Paginate pages={data.pages} page={data.page} />
					</>
				)}
				<ProductCategoryUI />
				<div className="h-full">
					{products && (
						<div className="w-11/12 mx-auto">
							<h6 className="font-poppins text-lg font-medium text-center mt-16">
								Highly Rated Products
							</h6>
							<div className="">
								<ProductsSlider products={products} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
