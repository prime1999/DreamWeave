import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllOrdersQuery } from "@/slices/OrderSlice";
import { columns } from "@/components/table/OrdersTable/Columns";
import { DataTable } from "@/components/table/OrdersTable/TableData";
import Loader from "@/components/Loader";

const AdminOrderPage = () => {
	const { data, isLoading, refetch } = useGetAllOrdersQuery({});

	return (
		<>
			<div className="w-10/12 mx-auto mt-8">
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
