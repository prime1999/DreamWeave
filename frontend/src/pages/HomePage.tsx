import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import {
	useGetHighlyRatedProductsQuery,
	useGetProductsQuery,
} from "@/slices/ProductSlice";
//import ProductCard from "@/components/ProductsComponent/ProductCard";
import Paginate from "@/components/Paginate";
import { useParams } from "react-router-dom";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";
import Loader from "@/components/Loader";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const HomePage = () => {
	const { pageNumber } = useParams();
	const { data, isLoading: loadingProducts } = useGetProductsQuery({
		pageNumber,
	});
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

	const { cartItems } = useSelector((state: any) => state.cart);

	return (
		<div>
			<Hero />
			<div className="relative container mx-auto my-8 w-11/12 md:w-full">
				{loadingProducts && <Loader />}
				{data && (
					<>
						<Sorting data={data.products} />
						<div className="mt-8">
							<h6 className="font-bold text-black text-2xl">New Products</h6>
							<div className="flex justify-center items-center">
								<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{data.products.map((product: any) => (
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
				<div className="h-full">
					{products && (
						<div className="w-11/12 mx-auto">
							<h6 className="font-bold text-black text-2xl">
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
