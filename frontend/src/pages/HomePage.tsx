import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import { useGetProductsQuery } from "@/slices/ProductSlice";
import ProductCard from "@/components/ProductsComponent/ProductCard";
import Paginate from "@/components/Paginate";
import { useParams } from "react-router-dom";

const HomePage = () => {
	const { pageNumber } = useParams();
	const { data } = useGetProductsQuery({ pageNumber });

	console.log(data?.products.length);
	return (
		<div>
			<Hero />
			<div className="container mx-auto my-8 w-full">
				<Sorting />

				{data && (
					<>
						<div className="mt-8">
							<h6 className="font-bold text-black text-2xl">New Products</h6>
							<div className="grid grid-cols-4 gap-2">
								{data.products.map((product) => (
									<ProductCard key={product._id} product={product} />
								))}
							</div>
						</div>
						<Paginate pages={data.pages} page={data.page} />
					</>
				)}
			</div>
		</div>
	);
};

export default HomePage;
