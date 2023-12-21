import { Link } from "react-router-dom";
import {
	FaProductHunt,
	FaShippingFast,
	FaUsers,
	FaQuestionCircle,
	FaChartBar,
} from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { IoIosChatbubbles } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import SalesChart from "@/Charts/SalesChart";
import OrderStatusChart from "@/Charts/OrderStatusChart";
import {
	useGetHighlyRatedProductsQuery,
	useGetAllProductsQuery,
} from "@/slices/ProductSlice";
import {
	calcReview,
	fiveStarRating,
	fourStarRating,
	oneStarRating,
	threeStarRating,
	twoStarRating,
} from "@/utils/CalcRating";

const RevenuePage = () => {
	const { data: products, isLoading } = useGetHighlyRatedProductsQuery({});
	const { data: allProducts, isLoading: productsLoading } =
		useGetAllProductsQuery({});
	return (
		<>
			<hr />
			<nav className="w-8/12 mx-auto mt-4">
				<ul className="flex items-center justify-between text-gray-500 text-sm">
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light active:bg-blue active:text-light"
						>
							<FaProductHunt className="mr-2" />
							Products
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaShippingFast className="mr-2" />
							Orders
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaUsers className="mr-2" />
							Users
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<TbPigMoney className="mr-2" />
							Statistics
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaQuestionCircle className="mr-2" />
							FAQ
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<IoIosChatbubbles className="mr-2" />
							Support
						</Link>
					</li>
				</ul>
			</nav>
			<div className="w-11/12 mx-auto">
				<div className="flex items-center p-4">
					<div className="w-[70%] p-4 shadow-md rounded-md">
						<div className="flex items-center">
							<h1 className="font-semibold text-lg">Sales Review</h1>
							<FaChartBar className="ml-2 text-blue" />
						</div>
						<SalesChart />
					</div>
					<div className="w-[30%] p-4 shadow-md ml-4">
						<div className="flex items-center font-poppins font-semibold">
							<h4 className="mr-2">Order Status</h4>
							<MdMenuBook className="text-blue" />
						</div>
						<OrderStatusChart />
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex w-[70%]">
						<div className="w-full p-4 shadow-md">
							<h4 className="font-poppins text-xl font-semibold mb-8 mt-4">
								Highly Rated Products
							</h4>
							<table className="w-full">
								<thead className="border-b">
									<th>Product-Id</th>
									<th>Product Name</th>
									<th>Price</th>
									<th>Rating</th>
									<th>Brand</th>
								</thead>
								<tbody className="font-poppins text-black text-sm text-center">
									{products?.map(
										(product, index) =>
											index < 3 && (
												<tr key={product._id}>
													<td>{product._id}</td>
													<td className="flex items-center">
														<img
															src={product.image}
															className="w-12 bg-white p-2"
														/>
														<p>{product.name}</p>
													</td>
													<td>{product.price}</td>
													<td className="mx-8">{product.rating}</td>
													<td>{product.brand}</td>
												</tr>
											)
									)}
								</tbody>
							</table>
						</div>
					</div>
					<div className="w-[30%] p-4 shadow-md rounded-lg ml-4">
						<h4 className="font-poppins text-lg font-semibold">
							Customer Review
						</h4>

						<p className="text-sm text-gray-500 mb-4">
							A total of {calcReview(allProducts)} reviews
						</p>
						<div>
							{allProducts && (
								<>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<p className="font-semibold">5 stars</p>
										<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
											<span
												className={`h-full rounded-lg bg-blue w-[${fiveStarRating(
													allProducts
												)}]`}
											></span>
										</span>
										<p className="font-semibold">
											{fiveStarRating(allProducts)}
										</p>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-500 my-2">
										<p className="font-semibold">4 stars</p>
										<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
											<span
												className={`h-full rounded-lg bg-blue w-[${fourStarRating(
													allProducts
												)}]`}
											></span>
										</span>
										<p className="font-semibold">
											{fourStarRating(allProducts)}
										</p>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<p className="font-semibold">3 stars</p>
										<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
											<span
												className={`h-full rounded-lg bg-blue w-[${threeStarRating(
													allProducts
												)}]`}
											></span>
										</span>
										<p className="font-semibold">
											{threeStarRating(allProducts)}
										</p>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-500 my-2">
										<p className="font-semibold">2 stars</p>
										<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
											<span
												className={`h-full rounded-lg bg-blue w-[${twoStarRating(
													allProducts
												)}]`}
											></span>
										</span>
										<p className="font-semibold">
											{twoStarRating(allProducts)}
										</p>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-500">
										<p className="font-semibold">1 star</p>
										<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
											<span
												className={`h-full rounded-lg bg-blue w-[${oneStarRating(
													allProducts
												)}]`}
											></span>
										</span>
										<p className="font-semibold">
											{oneStarRating(allProducts)}
										</p>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RevenuePage;
