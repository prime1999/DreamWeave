import { Link } from "react-router-dom";
import { useGetHighlyRatedProductsQuery } from "@/slices/ProductSlice";
import TopRatedSlider from "@/components/GsapSliders/TopRatedSlider";

const TopRated = () => {
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

	return (
		<>
			<h1 className="font-poppins text-lg font-medium text-center my-12">
				Top Rated Products
			</h1>
			<div className="hidden lg:flex">
				{products?.map(
					(product, index) =>
						index <= 4 && (
							<Link
								key={index}
								to={`/product/${product._id}`}
								className="w-96 h-48 flex flex-col items-center justify-center"
							>
								<div className="w-36 h-36 bg-gray-300 rounded-[100%] flex items-center justify-center">
									<img
										className="w-full h-24 object-scale-down"
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div>
									<h4 className="font-poppins text-sm mt-2 font-medium">
										{product.name}
									</h4>
									<p className="text-center text-sm font-medium text-gray-500">
										{product.countInStock} Items
									</p>
								</div>
							</Link>
						)
				)}
			</div>
			<TopRatedSlider />
		</>
	);
};

export default TopRated;
