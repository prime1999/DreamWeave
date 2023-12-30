import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartBar } from "react-icons/fa";
import { TbBusinessplan } from "react-icons/tb";
import { MdMenuBook, MdOutlineAttachMoney } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import {
	useGetHighlyRatedProductsQuery,
	useGetAllProductsQuery,
} from "@/slices/ProductSlice";
import { useGetAllOrdersQuery } from "@/slices/OrderSlice";
import { useGetUsersQuery } from "@/slices/UserSlice";
import {
	calcReview,
	fiveStarRating,
	fourStarRating,
	oneStarRating,
	threeStarRating,
	twoStarRating,
} from "@/utils/CalcRating";
import SalesChart from "@/Charts/SalesChart";
import OrderStatusChart from "@/Charts/OrderStatusChart";
import { calcSales } from "@/utils/CalcOrders";
import AdminPageSheet from "@/layouts/Responsiveness-layout/AdminPageSheet";
import Loader from "@/components/Loader";

const RevenuePage = () => {
	const { data: products, isLoading } = useGetHighlyRatedProductsQuery({});
	const { data: allProducts, isLoading: productsLoading } =
		useGetAllProductsQuery({}) as any;
	const { data } = useGetAllOrdersQuery({}) as any;
	const { data: users } = useGetUsersQuery({});

	const navigate = useNavigate();

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userInfo && !userInfo.isAdmin) {
			navigate("/");
		}
	}, []);

	return (
		<>
			{productsLoading ? (
				<Loader />
			) : (
				<div className="w-full mx-auto md:w-11/12">
					<AdminPageSheet>
						<LuLayoutDashboard className="mt-4 ml-4 text-blue hover:cursor-pointer md:hidden" />
					</AdminPageSheet>
					<div className="w-full flex flex-col items-center my-8 md:flex-row md:7/12 lg:w-7/12">
						<div className="w-11/12 mx-auto flex items-center md:w-1/2">
							<div className="p-4 bg-gray-100 rounded-md w-1/2 md:w-1/2">
								<MdOutlineAttachMoney className="bg-other text-blue p-1 rounded-full w-6 h-6" />
								<p className="mt-2 text-gray-400 text-sm">Total Sales</p>
								{data && (
									<h4 className="text-3xl font-semibold font-poppins mt-2">
										${calcSales(data)}
									</h4>
								)}
							</div>
							<div className="p-4 bg-gray-100 rounded-md w-1/2 mx-4 md:w-1/2">
								<MdOutlineAttachMoney className="bg-other text-blue p-1 rounded-full w-6 h-6" />
								<p className="mt-2 text-gray-400 text-sm">Total Orders</p>
								{data && (
									<h4 className="text-3xl font-semibold font-poppins mt-2">
										{data.length}
									</h4>
								)}
							</div>
						</div>
						<div className="w-11/12 mx-auto flex items-center mt-4 md:w-1/2 md:mt-0">
							<div className="p-4 bg-gray-100 rounded-md w-1/2 mr-4 md:w-1/2">
								<FaUsers className="bg-other text-blue p-1 rounded-full w-6 h-6" />
								<p className="mt-2 text-gray-400 text-sm">Total Customers</p>
								{users && (
									<h4 className="text-3xl font-semibold font-poppins mt-2">
										{users.length}
									</h4>
								)}
							</div>
							<div className="p-4 bg-gray-100 rounded-md w-1/2 mr-4 md:w-1/2">
								<TbBusinessplan className="bg-other text-blue p-1 rounded-full w-6 h-6" />
								<p className="mt-2 text-gray-400 text-sm">Total Products</p>
								{allProducts && (
									<h4 className="text-3xl font-semibold font-poppins mt-2">
										{allProducts.length}
									</h4>
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center p-4 md:flex-row">
						<div className="w-full p-1 shadow-md rounded-md md:w-[70%]">
							<div className="flex items-center">
								<h1 className="font-semibold text-lg">Sales Review</h1>
								<FaChartBar className="ml-2 text-blue" />
							</div>
							<SalesChart />
						</div>
						<div className="w-full mt-2 p-4 shadow-md ml-4 md:w-[30%] md:mt-0">
							<div className="flex items-center font-poppins font-semibold">
								<h4 className="mr-2">Order Status</h4>
								<MdMenuBook className="text-blue" />
							</div>
							<OrderStatusChart />
						</div>
					</div>
					<div className="flex flex-col items-center mt-8 lg:flex-row">
						<div className="hidden md:w-full md:flex lg:w-[70%]">
							<div className="w-full p-4 shadow-md">
								<h4 className="font-poppins text-xl font-semibold mb-8 mt-4">
									Highly Rated Products
								</h4>
								<table className="w-full h-[200px]">
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
						<div className="w-11/12 mx-auto p-4 shadow-md rounded-lg ml-4 md:mt-4 lg:mt-0 lg:w-[30%]">
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
													style={{ width: fiveStarRating(allProducts) }}
													className="h-full rounded-lg bg-blue"
												></span>
											</span>
											<p className="font-semibold">
												{fiveStarRating(allProducts)}
											</p>
										</div>
										<div className="flex items-center justify-between text-sm text-gray-500 my-2">
											<p className="font-semibold">4stars</p>
											<span className="flex w-[250px] h-2 bg-other rounded-lg mx-2">
												<span
													style={{ width: fourStarRating(allProducts) }}
													className="h-full rounded-lg bg-blue"
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
													style={{ width: threeStarRating(allProducts) }}
													className="h-full rounded-lg bg-blue"
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
													style={{ width: twoStarRating(allProducts) }}
													className="h-full rounded-lg bg-blue"
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
													style={{ width: oneStarRating(allProducts) }}
													className="h-full rounded-lg bg-blue"
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
			)}
		</>
	);
};

export default RevenuePage;
