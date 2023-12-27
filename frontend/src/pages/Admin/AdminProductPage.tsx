import { useState } from "react";
import { BsFillEyeFill, BsPlus } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
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
import {
	useGetAllProductsQuery,
	useAddProductMutation,
	useUploadProductImageMutation,
} from "@/slices/ProductSlice";
import Loader from "@/components/Loader";
import logo from "@/assets/images/logo.png";

const AdminProductPage = () => {
	type FormDataType = {
		[key: string]: string | number;
		name: string;
		brand: string;
		price: number;
		rating: number;
		countInStock: number;
		description: string;
	};
	const [pic, setPic] = useState<string>(logo);
	const [category, setCategory] = useState<string>("");
	const [formData, setFormData] = useState<FormDataType>({
		name: "",
		brand: "",
		price: 0,
		rating: 0,
		countInStock: 0,
		description: "",
	});

	let { name, brand, price, rating, countInStock, description } = formData;
	const { data, isLoading, refetch } = useGetAllProductsQuery({});
	const [uploadImage, { isLoading: uploadLoading }] =
		useUploadProductImageMutation();
	const [addProduct, { isLoading: productLoading }] = useAddProductMutation();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			try {
				const res = await uploadImage(formData).unwrap();
				setPic(res.image);
				//show a success message
				toast.success(`${res.message}`, {
					className: "bg-green-200",
					bodyClassName: "text-black font-poppins font-semibold",
					progressClassName: "bg-transparent",
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleAddProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		const emptyProperties = [];

		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				const value = formData[key];

				// Check for empty string or 0
				if (value === "" || value === 0) {
					emptyProperties.push(key);
				}
			}
		}
		if (emptyProperties.length === 0 || category !== "" || pic !== "") {
			try {
				// create the product details to send to the backend
				const productDetails = {
					name,
					brand,
					category,
					image: pic,
					desc: description,
					price,
					countInStock,
					rating,
				};
				console.log(productDetails);
				await addProduct({ productDetails }).unwrap();
				//show a success message
				toast.success("Product Added", {
					className: "bg-green-200",
					bodyClassName: "text-black font-poppins font-semibold",
					progressClassName: "bg-transparent",
				});
				// clear the form fields
				setFormData({
					name: "",
					brand: "",
					price: 0,
					rating: 0,
					countInStock: 0,
					description: "",
				});
				setCategory("");
				setPic(logo);
			} catch (error) {
				// TODO // show error message
				console.log(error);
			}
		} else {
			// TODO // show error message
		}
	};
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
										<img src={pic} alt="" className="h-full mx-auto" />
									</div>
									<div className="w-11/12 mx-auto">
										<label
											htmlFor="image"
											className="flex items-center justify-center w-36 p-2 border mt-4 rounded-lg bg-white font-semibold duration-500 hover:bg-light hover:cursor-pointer"
										>
											<MdOutlineFileUpload />{" "}
											<span className="ml-2">Add Image</span>
										</label>
										<input
											type="file"
											id="image"
											onChange={handleImageUpload}
											className="hidden"
										/>
									</div>
								</div>
								<div className="py-4 w-2/3 ml-8 bg-gray-50 rounded-lg shadow-md">
									<h6 className="px-4 pb-4 font-semibold text-xl">
										Product Information
									</h6>
									<hr />
									<form
										onSubmit={handleAddProduct}
										className="w-full px-4 mt-4"
									>
										<div className="w-full flex flex-col">
											<label className="font-semibold">Product Name</label>
											<input
												type="text"
												value={name}
												onChange={(e) => handleChange(e)}
												id="name"
												className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
											/>
										</div>
										<div className="flex items-center justify-between mt-4">
											<div className="flex flex-col w-1/2">
												<label className="font-semibold">Brand</label>
												<input
													type="text"
													value={brand}
													onChange={(e) => handleChange(e)}
													id="brand"
													className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
												/>
											</div>
											<div className="w-1/2 ml-4">
												<label className="font-semibold">Category</label>
												<Select onValueChange={(e: any) => setCategory(e)}>
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
														value={price}
														onChange={(e) => handleChange(e)}
														id="price"
														placeholder="$ ..."
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col">
													<label className="font-semibold">Rating</label>
													<input
														type="number"
														value={rating}
														onChange={(e) => handleChange(e)}
														id="rating"
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col">
													<label className="font-semibold">
														Count-In-Stock
													</label>
													<input
														type="number"
														value={countInStock}
														onChange={(e) => handleChange(e)}
														id="countInStock"
														className="h-8 bg-transparent border mt-2 rounded-md px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
											</div>
										</div>
										<div className="flex flex-col mt-4">
											<label className="font-semibold mb-2">Description</label>
											<textarea
												placeholder="Description"
												value={description}
												onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
													setFormData((prevState) => ({
														...prevState,
														description: e.target.value,
													}))
												}
												id="description"
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
