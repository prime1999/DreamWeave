import { BsFillEyeFill, BsPlus } from "react-icons/bs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/table/ProductsTable/TableData";
import { columns } from "../../components/table/ProductsTable/Columns";
import { useGetAllProductsQuery } from "@/slices/ProductSlice";
import Loader from "@/components/Loader";

const AdminProductPage = () => {
	const { data, isLoading } = useGetAllProductsQuery({});
	return (
		<>
			<div className="w-10/12 mx-auto mt-8">
				<h4 className="text-3xl font-bold text-black">Products</h4>
				<div>
					<Tabs defaultValue="account" className="w-[400px]">
						<TabsList className="bg-transparent">
							<TabsTrigger className="mr-8" value="viewProduct">
								<BsFillEyeFill /> <span className="ml-2">View Product</span>
							</TabsTrigger>
							<TabsTrigger value="addProduct">
								<BsPlus className="text-lg" />
								<span className="ml-2">Add Product</span>
							</TabsTrigger>
						</TabsList>
						<TabsContent className="w-[1000px]" value="viewProduct">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable columns={columns} data={data} />
							)}
						</TabsContent>
						<TabsContent value="addProduct">
							Change your password here.
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default AdminProductPage;
