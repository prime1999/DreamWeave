import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllOrdersQuery } from "@/slices/OrderSlice";
import { columns } from "@/components/table/OrdersTable/Columns";
import { DataTable } from "@/components/table/OrdersTable/TableData";
import Loader from "@/components/Loader";
import { calcOrdersLength } from "@/utils/CalcOrders";

const AdminOrderPage = () => {
	const { data, isLoading, refetch } = useGetAllOrdersQuery({});

	const navigate = useNavigate();

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userInfo && !userInfo.isAdmin) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<div className="w-10/12 mx-auto mt-8">
				{data && (
					<div className="flex items-center mb-8 flex-wrap w-11/12 mx-auto">
						<div className="w-48 p-4 rounded-md bg-orange-50">
							<h6 className="font-bold text-lg">Pending Orders</h6>
							<h3 className="text-orange-600 font-bold text-3xl">
								{calcOrdersLength(data, "pending")}
							</h3>
						</div>
						<div className="w-48 p-4 rounded-md bg-yellow-50 mt-2 md:mt-0 md:ml-4">
							<h6 className="font-bold text-lg">Processing Orders</h6>
							<h3 className="text-yellow-600 font-bold text-3xl">
								{calcOrdersLength(data, "processing")}
							</h3>
						</div>
						<div className="w-48 p-4 rounded-md bg-green-50 mt-2 md:mt-0 md:ml-4">
							<h6 className="font-bold text-lg">Shipped Orders</h6>
							<h3 className="text-green-600 font-bold text-3xl">
								{calcOrdersLength(data, "shipped")}
							</h3>
						</div>
						<div className="w-48 p-4 rounded-md bg-cyan-50 mt-2 md:mt-0 md:ml-4">
							<h6 className="font-bold text-lg">Delivered Orders</h6>
							<h3 className="text-cyan-600 font-bold text-3xl">
								{calcOrdersLength(data, "delivered")}
							</h3>
						</div>
						<div className="w-48 p-4 rounded-md bg-red-50 mt-2 md:mt-0 md:ml-4">
							<h6 className="font-bold text-lg">Cancelled Orders</h6>
							<h3 className="text-red-600 font-bold text-3xl">
								{calcOrdersLength(data, "cancelled")}
							</h3>
						</div>
					</div>
				)}
				<h1 className="text-2xl font-poppins font-semibold text-blue">
					Orders
				</h1>
				<div className="w-full">
					<Tabs defaultValue="allOrders" className="w-[400px]">
						<TabsList className="bg-transparent">
							<TabsTrigger value="allOrders">All Orders</TabsTrigger>
							<TabsTrigger className="mx-8" value="pendingOrders">
								Pending Orders
							</TabsTrigger>
							<TabsTrigger value="processingOrders">
								Processing Orders
							</TabsTrigger>
							<TabsTrigger className="mx-8" value="shippedOrders">
								Shipped Orders
							</TabsTrigger>
							<TabsTrigger value="deliveredOrders">
								Delivered Orders
							</TabsTrigger>
							<TabsTrigger className="ml-8" value="cancelledOrders">
								Cancelled Orders
							</TabsTrigger>
						</TabsList>
						<TabsContent className="w-[900px]" value="allOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable refetch={refetch} columns={columns} data={data} />
							)}
						</TabsContent>
						<TabsContent className="w-[900px]" value="pendingOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									refetch={refetch}
									columns={columns}
									data={data?.filter(
										(order: any) => order.status === "pending"
									)}
								/>
							)}
						</TabsContent>
						<TabsContent className="w-[900px]" value="processingOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									refetch={refetch}
									columns={columns}
									data={data?.filter(
										(order: any) => order.status === "processing"
									)}
								/>
							)}
						</TabsContent>
						<TabsContent className="w-[900px]" value="shippedOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									refetch={refetch}
									columns={columns}
									data={data?.filter(
										(order: any) => order.status === "shipped"
									)}
								/>
							)}
						</TabsContent>
						<TabsContent className="w-[900px]" value="deliveredOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									refetch={refetch}
									columns={columns}
									data={data?.filter(
										(order: any) => order.status === "delivered"
									)}
								/>
							)}
						</TabsContent>
						<TabsContent className="w-[900px]" value="cancelledOrders">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable
									refetch={refetch}
									columns={columns}
									data={data?.filter(
										(order: any) => order.status === "cancelled"
									)}
								/>
							)}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default AdminOrderPage;
