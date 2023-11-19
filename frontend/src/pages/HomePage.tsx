import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import {
	useGetHighlyRatedProductsQuery,
	useGetProductsQuery,
} from "@/slices/ProductSlice";
import ProductCard from "@/components/ProductsComponent/ProductCard";
import Paginate from "@/components/Paginate";
import { Link, useParams } from "react-router-dom";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";

const HomePage = () => {
	const { pageNumber } = useParams();
	const { data } = useGetProductsQuery({ pageNumber });
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

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
									<Link key={product._id} to={`/product/${product._id}`}>
										<ProductCard product={product} />
									</Link>
								))}
							</div>
						</div>
						<Paginate pages={data.pages} page={data.page} />
					</>
				)}
				<div>
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
