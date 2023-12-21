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
import { useGetHighlyRatedProductsQuery } from "@/slices/ProductSlice";

const RevenuePage = () => {
	const { data: products, isLoading } = useGetHighlyRatedProductsQuery({});
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
										index <= 4 && (
											<>
												<tr>
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
											</>
										)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default RevenuePage;
