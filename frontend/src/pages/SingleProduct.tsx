import { useState, Suspense, lazy } from "react";
import { Link, useParams } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import Rating from "@/components/ProductsComponent/Rating";
import {
	useGetSinlgeProductQuery,
	useGetProductsByCategoryQuery,
} from "@/slices/ProductSlice";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";
import { ProductType } from "@/DataTypes/ProductType";
import SingleProductSkeleton from "@/components/miscelleneous/SingleProductSkeleton";

const SingleProduct = () => {
	const [count, setCount] = useState<number>(1);
	const { productId } = useParams();
	const { data } = useGetSinlgeProductQuery({ productId });
	const { data: products, isLoading: productLoading } =
		useGetProductsByCategoryQuery({ productId });

	const handleCountIncrease = () => {
		if (count === data?.countInStock) {
			setCount(data?.countInStock);
		} else {
			setCount((prevState) => prevState + 1);
		}
	};

	const handleCountDecrease = () => {
		if (count > 1) {
			setCount((prevState) => prevState - 1);
		} else {
			setCount(1);
		}
	};

	return (
		<>
			{productLoading && <SingleProductSkeleton />}
			{data && (
				<>
					<div className="w-10/12 md:mx-auto md:w-11/12">
						<hr />
						<div className="my-4 w-11/12 mx-auto md:mx-0">
							<p className="text-md text-gray-400 font-semibold">
								<span className="mr-2">products</span>/
								<span className="mx-2">{data?.category}</span>/
								<span className="mx-2">{data?.brand}</span>/
								<span className="mx-2 text-black">{data?.name}</span>
							</p>
						</div>
						<div className="flex flex-col w-11/12 mx-auto my-8 md:flex-row">
							<div className="max-w-[500px]">
								<img src={data?.image} alt="" />
							</div>
							<div className="md:ml-28">
								<h1 className="font-poppins font-bold text-3xl mb-4">
									{data?.name}
								</h1>
								<p className="text-black text-sm font-semibold w-96">
									{data?.description}
								</p>
								<div className="mt-4">
									<Rating value={data?.rating} text={data?.numReviews} />
								</div>
								<hr className="mt-8" />
								<div className="mt-4">
									<h6 className="font-semibold text-2xl">${data.price}</h6>
								</div>
								<hr className="mt-8" />
								<div className="flex items-center">
									<div className="flex items-center justify-between w-36 bg-light mt-4 rounded-3xl font-poppins font-semibold text-lg px-8 py-2">
										<button
											onClick={handleCountDecrease}
											className="text-2xl hover:cursor-pointer"
										>
											-
										</button>
										<p>{count}</p>
										<button
											onClick={handleCountIncrease}
											className="text-2xl hover:cursor-pointer"
										>
											+
										</button>
									</div>
									<div className="text-sm mt-3 ml-4 font-semibold">
										<p>
											only{" "}
											<span className="text-orange-500 font-bold">
												{data.countInStock}
												items
											</span>{" "}
											left! <br />
											Don't miss it
										</p>
									</div>
								</div>
								<div className="flex justify-between mt-4">
									<button className="px-4 py-3 text-light bg-blue font-semibold rounded-full duration-500 hover:bg-light hover:text-blue md:px-8">
										Buy Now
									</button>
									<button className="px-4 py-3 ml-4 border border-blue text-blue bg-light font-semibold rounded-full duration-500 hover:bg-blue hover:text-light md:px-8">
										Add to cart
									</button>
								</div>
								<div className="border mt-4 max-w-[450px]">
									<div className="flex items-start w-11/12 mx-auto py-4">
										<FaTruck className="text-xl text-orange-500" />
										<div className="font-poppins text-sm ml-4">
											<h6 className="font-semibold">Free Delivery</h6>
											<p className="underline">
												Enter your postal code for free delivery availabity
											</p>
										</div>
									</div>
									<hr />
									<div className="flex items-start w-11/12 mx-auto py-4">
										<GiReturnArrow className="text-xl text-orange-500" />
										<div className="font-poppins text-sm ml-4">
											<h6 className="font-semibold">Return Delivery</h6>
											<p className="">
												Free 30 days Relivery return{" "}
												<Link to="/" className="underline font-semibold">
													Details.
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<div className="my-16 w-11/12 mx-auto">
				<h6 className="font-semibold text-2xl">Similar Items You Might Like</h6>
				<ProductsSlider products={products as ProductType[]} />
			</div>
		</>
	);
};

export default SingleProduct;
