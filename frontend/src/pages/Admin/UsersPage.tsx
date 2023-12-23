import { useEffect, useState } from "react";
import { BsFillSendFill, BsTelephoneFill } from "react-icons/bs";
import { MdArrowRightAlt } from "react-icons/md";
import Loader from "@/components/Loader";
import { columns } from "@/components/table/UsersTable/Columns";
import { DataTable } from "@/components/table/UsersTable/TableData";
import { useGetUsersQuery, useGetUserDetailsQuery } from "@/slices/UserSlice";
import { calcOrders, calcSales } from "@/utils/CalcOrders";
import { cartPrice } from "@/utils/CartUtils";

const UsersPage = () => {
	const { data, isLoading } = useGetUsersQuery({});
	const [userId, setUserId] = useState<string>("");
	const {
		data: userDetails,
		isLoading: detailsLoading,
		refetch,
	} = useGetUserDetailsQuery(userId);
	useEffect(() => {
		// Set up an interval to periodically check the cookie
		const intervalId = setInterval(() => {
			const cookie = document.cookie.split(";");
			const id: any = cookie
				.find((row) => row.startsWith("userId="))
				?.split("=")[1];
			if (id !== userId) {
				setUserId(id);
				refetch();
			}
		}, 3000);
		console.log(userId);
		console.log(userDetails);
		// Clean up the interval when the component unmounts
		return () => clearInterval(intervalId);
	});

	return (
		<div className="w-10/12 mx-auto mt-8">
			<h4 className="font-bold text-3xl text-blue">Active Users</h4>
			{isLoading ? <Loader /> : <DataTable columns={columns} data={data} />}
			<div>
				{userDetails && (
					<div className="w-11/12 mx-auto flex items-center p-2 mt-8 text-black">
						<div className="flex flex-col items-center justify-center p-4 rounded-md w-1/3 bg-other">
							<img
								src={userDetails.user.pic}
								alt={userDetails.user.name}
								className="w-48 rounded-full p-2 border border-light"
							/>
							<div className="text-center mt-8 flex flex-col items-center justify-center">
								<h4 className="text-4xl font-bold">{userDetails.user.name}</h4>
								<p className="text-md font-semibold text-gray-500">
									{userDetails.user.email}
								</p>
								<p className="font-bold mt-2">{userDetails.user.phoneNumber}</p>
								<hr className="border-[1.5px] w-full mt-4" />
							</div>
							<div className="flex mt-4 text-sm">
								<button className="flex items-center justify-between w-18 px-2 py-1 rounded-md font-semibold bg-blue text-light duration-500 hover:bg-light hover:text-black">
									<BsFillSendFill className="mr-1" /> Email
								</button>
								<button className="flex justify-between w-18 px-2 items-center py-1 ml-4 rounded-md font-semibold bg-light duration-500 hover:bg-blue hover:text-light">
									<BsTelephoneFill className="mr-1" /> Text
								</button>
							</div>
						</div>
						<div className="w-2/3 ml-4">
							<div className="flex items-center">
								<div className="w-1/2 bg-other rounded-md p-8">
									<h4 className="text-3xl font-semibold">Orders</h4>
									<hr className="border-[1.5px] mt-2" />
									<div className="flex items-center justify-between mt-4">
										<div className="flex">
											<h4 className="text-2xl font-semibold">
												{userDetails.orders.length}
											</h4>
											<p className="mt-4 text-md font-semibold text-gray-600">
												(total)
											</p>
										</div>
										<div className="border border-blue text-blue text-lg font-bold rounded-full p-2">
											<MdArrowRightAlt />
										</div>
									</div>
									<h6 className="flex justify-end mt-4 font-semibold text-red-600">
										No Impression change
									</h6>
								</div>
								<div className="w-1/2 bg-other rounded-md p-8 ml-4">
									<h4 className="text-3xl font-semibold">Order Cost</h4>
									<hr className="border-[1.5px] mt-2" />
									<div className="flex items-center justify-between mt-4">
										<div className="flex">
											<h4 className="text-2xl font-semibold">
												{calcOrders(userDetails.orders)}
											</h4>
											<p className="mt-4 text-md font-semibold text-gray-600">
												USD
											</p>
										</div>
										<div className="border border-blue text-blue text-lg font-bold rounded-full p-2">
											<MdArrowRightAlt />
										</div>
									</div>
									<h6 className="flex justify-end mt-4 font-semibold text-red-600">
										No Impression change
									</h6>
								</div>
							</div>
							<div className="mt-4 w-full flex justify-between">
								<div className="bg-other p-8 rounded-md w-1/2">
									<h4 className="text-3xl font-semibold">Cart</h4>
									<hr className="border-[1.5px] mt-2" />
									<div className="flex items-center justify-between mt-4">
										<div className="flex">
											<h4 className="text-2xl font-semibold">
												{userDetails.cart.length > 0
													? userDetails.cart[0].items.length
													: "0"}
											</h4>
											<p className="mt-4 text-md font-semibold text-gray-600">
												(total)
											</p>
										</div>
										<div className="border border-blue text-blue text-lg font-bold rounded-full p-2">
											<MdArrowRightAlt />
										</div>
									</div>
								</div>
								<div className="ml-4 bg-other p-8 rounded-md w-1/2">
									<h4 className="text-3xl font-semibold">Cart Cost</h4>
									<hr className="border-[1.5px] mt-2" />
									<div className="flex items-center justify-between mt-4">
										<div className="flex">
											<h4 className="text-2xl font-semibold">
												{userDetails.cart.length > 0
													? cartPrice(userDetails.cart)
													: 0}
											</h4>
											<p className="mt-4 text-md font-semibold text-gray-600">
												USD
											</p>
										</div>
										<div className="border border-blue text-blue text-lg font-bold rounded-full p-2">
											<MdArrowRightAlt />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UsersPage;
