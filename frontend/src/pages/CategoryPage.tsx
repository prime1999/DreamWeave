import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "@/slices/ProductSlice";
import WearableHero from "@/components/layouts/CategoryHero/WearableHero";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const CategoryPage = () => {
	const params = useParams();
	console.log(params.category);
	const { data, isLoading } = useGetProductsByCategoryQuery({
		category: params.category,
	});

	const { cartItems } = useSelector((state: any) => state.cart);
	console.log(data);
	return (
		<>
			<div>{params.category === "wearable tech" && <WearableHero />}</div>
			<div className="w-11/12 mx-auto mt-8">
				<h4 className="font-bold text-2xl">Watches for you</h4>
				<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{data?.map((product) => (
						<Suspense key={product._id} fallback={<CardSkeleton />}>
							<ProductCard cart={cartItems} product={product} />
						</Suspense>
					))}
				</div>
			</div>
		</>
	);
};

export default CategoryPage;
