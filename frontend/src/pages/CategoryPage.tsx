import { Suspense, lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "@/slices/ProductSlice";
import WearableHero from "@/components/layouts/CategoryHero/WearableHero";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";
import Loader from "@/components/Loader";
import Sorting from "@/components/layouts/Sorting";
import SmartPhoneHero from "@/components/layouts/CategoryHero/SmartPhoneHero";
import LaptopHero from "@/components/layouts/CategoryHero/LaptopHero";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const CategoryPage = () => {
	const params = useParams();
	const { data, isLoading } = useGetProductsByCategoryQuery({
		category: params.category,
	});
	// state for the products and the value of the brand
	const [value, setValue] = useState<string>("");
	const [products, setProducts] = useState<any>([]);

	const { cartItems } = useSelector((state: any) => state.cart);

	useEffect(() => {
		// init a result variable to an empty array
		let result: any[] = [];
		// check if there is a value and there is data
		if (value && data) {
			// if yes, then filter out the data that has the sam brand as the value passed in and store them in the reult array
			value === "all"
				? data?.map((product: any) => result.push(product))
				: data.filter(
						(product) => product.brand === value && result.push(product)
				  );
		} else {
			// if no, then there is not value, store the whole datat in the result array
			data?.map((product: any) => result.push(product));
		}
		// set the products to the result array
		setProducts(result);
	}, [data, value]);
	return (
		<>
			{isLoading && <Loader />}
			<div>{params.category === "wearable tech" && <WearableHero />}</div>
			<div>
				{params.category === "laptops and computer components" && (
					<LaptopHero />
				)}
			</div>
			<div>
				{params.category === "smartphones and accessories" && (
					<SmartPhoneHero />
				)}
			</div>
			<div className="w-11/12 mx-auto mt-8">
				<h4 className="font-bold text-2xl">{params.category}</h4>
				<div className="my-4">
					<Sorting setValue={setValue} data={data} />
				</div>
				<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{products?.map((product: any) => (
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
