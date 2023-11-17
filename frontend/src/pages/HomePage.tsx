import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import { useGetProductsQuery } from "@/slices/ProductSlice";
import ProductCard from "@/components/ProductsComponent/ProductCard";

const HomePage = () => {
	const { data } = useGetProductsQuery({} as any);
	return (
		<div>
			<Hero />
			<div className="container mx-auto my-8 w-full">
				<Sorting />

				{data && (
					<div className="grid grid-cols-4 gap-2 mt-8">
						{data.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
