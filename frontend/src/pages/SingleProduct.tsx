import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTruck } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import Rating from "@/components/ProductsComponent/Rating";
import {
	useGetSinlgeProductQuery,
	useGetProductsWithSimilarCategoryQuery,
} from "@/slices/ProductSlice";
import { useAddToCartMutation } from "@/slices/CartApiSlice";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";
import { ProductType } from "@/DataTypes/ProductType";
import SingleProductSkeleton from "@/components/miscelleneous/SingleProductSkeleton";
import { addToCart } from "@/slices/CartSlice";
import PagesNavBar from "@/layouts/PagesNavBar";
import ProductReviewCard from "@/components/ProductReviewCard";

const SingleProduct = () => {
	const [count, setCount] = useState<number>(1);
	const { productId } = useParams();
	const { data } = useGetSinlgeProductQuery({ productId });
	const { data: products, isLoading: productLoading } =
		useGetProductsWithSimilarCategoryQuery({ productId });
	const [addItemToCart] = useAddToCartMutation();
	const { userInfo } = useSelector((state: any) => state.auth);
	const { cartItems } = useSelector((state: any) => state.cart);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const handleCart = (product: ProductType) => {
		dispatch(addToCart({ ...product, qty: count }));
		if (userInfo) {
			addItemToCart({ product: product._id, quantity: count });
		}
		// show a success message
		toast.success("Item added to cart", {
			className: "bg-green-200",
			bodyClassName: "text-black font-poppins font-semibold",
			progressClassName: "bg-transparent",
		});
		navigate("/cart");
	};

	return (
		<>
			<PagesNavBar />
			{productLoading ? (
				<SingleProductSkeleton />
			) : (
				<>
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
								<div className="flex flex-col w-11/12 mx-auto my-8 lg:flex-row">
									<div className="w-1/2">
										<img
											className="max-w-[300px] md:max-w-[500px]"
											src={data?.image}
											alt=""
										/>
									</div>
									<div className="w-full mx-auto md:mt-16 lg:mt-0 lg:ml-28">
										<h1 className="font-poppins font-bold text-3xl mb-4">
											{data?.name}
										</h1>
										<p className="text-black text-sm font-semibold md:w-96">
											{data?.description}
										</p>
										<div className="mt-4">
											<Rating value={data?.rating} text={data?.numReviews} />
										</div>
										<hr className="mt-8 border-1 border-black" />
										<div className="mt-4">
											<h6 className="font-semibold text-2xl">${data.price}</h6>
										</div>
										<hr className="mt-8 border-1 border-black" />
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
										<div className="mt-4 w-full">
											{cartItems.some((item: any) => item._id === data._id) ? (
												<button
													onClick={() => navigate("/cart")}
													className="w-full px-4 py-3 border border-blue text-blue bg-light font-semibold rounded-full duration-500 hover:bg-blue hover:text-light md:px-8"
												>
													In Cart
												</button>
											) : (
												<button
													onClick={() => handleCart(data)}
													className="w-full px-4 py-3 text-white bg-black font-semibold rounded-xl duration-500 hover:bg-dark hover:text-light md:px-8"
												>
													Add to Cart
												</button>
											)}
										</div>
										<div className="border mt-4 w-full">
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
					<div className="w-11/12 mx-auto font-poppins font-medium">
						<div className="flex items-center justify-between">
							<h3>
								What People think about the{" "}
								<span className="text-xl">{data?.name}</span>
							</h3>
							<h3 className="duration-400 hover:cursor-pointer hover:text-gray-600">
								See All
							</h3>
						</div>
						<hr className="border-black mt-4" />
						<div className="w-11/12 mx-auto">
							{data?.review ? (
								<div className="py-8 grid grid-cols-1 md:grid-cols-2">
									{data?.review.map((review, index) => (
										<ProductReviewCard key={index} review={review} />
									))}
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<div className="my-16 w-11/12 mx-auto">
						<h6 className="font-semibold text-2xl">
							Similar Items You Might Like
						</h6>
						<ProductsSlider products={products as ProductType[]} />
					</div>
				</>
			)}
		</>
	);
};

export default SingleProduct;
