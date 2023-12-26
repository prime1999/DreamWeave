import { BsFillEyeFill, BsPlus } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/table/ProductsTable/TableData";
import { columns } from "../../components/table/ProductsTable/Columns";
import { useGetAllProductsQuery } from "@/slices/ProductSlice";
import Loader from "@/components/Loader";
import logo from "@/assets/images/logo.png";

const AdminProductPage = () => {
	const { data, isLoading, refetch } = useGetAllProductsQuery({});
	return (
		<>
			<div className="w-10/12 mx-auto mt-8">
				<h4 className="text-3xl font-bold text-black">Products</h4>
				<div className="mt-4">
					<Tabs defaultValue="viewProduct" className="w-[400px]">
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
								<DataTable refetch={refetch} columns={columns} data={data} />
							)}
						</TabsContent>
						<TabsContent className="w-[1200px]" value="addProduct">
							<div className="flex items-start justify-between mt-8">
								<div className="w-1/3 rounded-lg bg-gray-50 shadow-md py-4">
									<h6 className="px-4 pb-4 font-semibold text-xl">
										Upload Product Image
									</h6>
									<hr />
									<div className="w-11/12 mx-auto bg-blue h-72 mt-4 rounded-lg">
										<img src={logo} alt="" className="h-full mx-auto" />
									</div>
									<div className="w-11/12 mx-auto">
										<label
											htmlFor="image"
											className="flex items-center justify-center w-36 p-2 border mt-4 rounded-lg bg-white font-semibold duration-500 hover:bg-light hover:cursor-pointer"
										>
											<MdOutlineFileUpload />{" "}
											<span className="ml-2">Add Image</span>
										</label>
										<input type="file" id="image" className="hidden" />
									</div>
								</div>
								<div className="py-4 w-2/3 ml-8 bg-gray-50 rounded-lg shadow-md">
									<h6 className="px-4 pb-4 font-semibold text-xl">
										Product Information
									</h6>
									<hr />
									<form className="w-full px-4 mt-4">
										<div className="w-full flex flex-col">
											<label className="font-semibold">Product Name</label>
											<input
												type="text"
												className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
											/>
										</div>
										<div className="flex items-center justify-between mt-4">
											<div className="flex flex-col w-1/2">
												<label className="font-semibold">Brand</label>
												<input
													type="text"
													className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
												/>
											</div>
											<div className="w-1/2 ml-4">
												<label className="font-semibold">Category</label>
												<Select>
													<SelectTrigger className="w-full border outline-none bg-transparent mt-2 focus:outline-none focus:border-none">
														<SelectValue placeholder="Categories" />
													</SelectTrigger>
													<SelectContent className="w-full bg-gray-50">
														<SelectItem value="Laptops and Computer Components">
															Laptops and Computer Components
														</SelectItem>
														<SelectItem value="Wearable Tech">
															Wearable Tech
														</SelectItem>
														<SelectItem value="Smartphones and Accessories">
															Smartphones and Accessories
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="mt-4">
											<div className="flex items-center justify-between">
												<div className="flex flex-col">
													<label className="font-semibold">Price</label>
													<input
														type="number"
														placeholder="$ ..."
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col">
													<label className="font-semibold">Rating</label>
													<input
														type="number"
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col">
													<label className="font-semibold">
														Count-In-Stock
													</label>
													<input
														type="number"
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
											</div>
										</div>
										<div className="flex flex-col mt-4">
											<label className="font-semibold mb-2">Description</label>
											<textarea
												placeholder="Description"
												className="bg-transparent px-4 border rounded-lg h-24 focus:outline-none focus:shadow-sm"
											/>
										</div>
										<button className="w-full rounded-lg text-light font-semibold bg-blue mt-4 py-2 duration-500 hover:bg-cyan-700">
											ADD PRODUCT
										</button>
									</form>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default AdminProductPage;
