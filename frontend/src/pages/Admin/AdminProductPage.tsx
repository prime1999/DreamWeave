import { useState } from "react";
import { BsFillEyeFill, BsPlus } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
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
import UpdateProduct from "@/components/UpdateProduct";

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
	// state for the update search id
	const [productId, setProductId] = useState<string>("");
	// state fot the form and image
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
	// get the function to get all products from the slice
	const { data, isLoading, refetch } = useGetAllProductsQuery({});
	// get the function to upload the image from the slice
	const [uploadImage, { isLoading: uploadLoading }] =
		useUploadProductImageMutation();
	// get the function to add a product from the slice
	const [addProduct, { isLoading: productLoading }] = useAddProductMutation();

	// function to set the value of the form data
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to upload image to the backend
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			try {
				// call the uplaod image functionality to send to the backend and get the response
				const res = await uploadImage(formData).unwrap();
				// set the pic to the res imge file path
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

	// function to submit file for adding a product
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
		if (emptyProperties.length === 0 || category !== "" || pic !== logo) {
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
				// awaut on the function to add the product to the DB
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
			<div className="w-full mx-auto mt-8 md:w-10/12">
				<h4 className="text-3xl font-bold text-black">Products</h4>
				<div className="mt-4">
					<Tabs defaultValue="viewProduct" className="w-[400px]">
						<TabsList className="bg-transparent mx-auto flex justify-center">
							<TabsTrigger value="viewProduct">
								<BsFillEyeFill /> <span className="ml-2">View Product</span>
							</TabsTrigger>
							<TabsTrigger className="md:mx-8" value="addProduct">
								<BsPlus className="text-lg" />
								<span className="ml-2">Add Product</span>
							</TabsTrigger>
							<TabsTrigger value="updateProduct">
								<GrDocumentUpdate className="text-md" />
								<span className="ml-2">Update Product</span>
							</TabsTrigger>
						</TabsList>
						<TabsContent className="w-[1000px]" value="viewProduct">
							{isLoading ? (
								<Loader />
							) : (
								<DataTable refetch={refetch} columns={columns} data={data} />
							)}
						</TabsContent>
						<TabsContent
							className="w-[400px] md:w-[600px] lg:w-[1200px]"
							value="addProduct"
						>
							<div className="flex flex-col items-start justify-between mt-8 lg:flex-row">
								<div className="w-full rounded-lg bg-gray-50 shadow-lg py-4 lg:w-1/3">
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
								<div className="py-4 w-full bg-gray-50 rounded-lg shadow-md mt-4 lg:mt-0 lg:ml-8 lg:w-2/3">
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
												className="h-8 bg-transparent border mt-2 rounded-lg px-2 focus:outline-none focus:shadow-sm"
											/>
										</div>
										<div className="flex flex-col mt-4 lg:flex-row lg:items-center lg:justify-between">
											<div className="flex flex-col w-full lg:w-1/3">
												<label className="font-semibold">Brand</label>
												<input
													type="text"
													value={brand}
													onChange={(e) => handleChange(e)}
													id="brand"
													className="h-8 bg-transparent border mt-2 rounded-lg px-2 focus:outline-none focus:shadow-sm"
												/>
											</div>
											<div className="mt-4 w-full lg:w-1/3 lg:mt-0 lg:ml-4">
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
											<div className="w-full flex flex-col lg:items-center lg:justify-between lg:flex-row">
												<div className="flex flex-col">
													<label className="font-semibold">Price</label>
													<input
														type="number"
														value={price}
														onChange={(e) => handleChange(e)}
														id="price"
														placeholder="$ ..."
														className="h-8 bg-transparent border mt-2 rounded-lg px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col mt-4 lg:mt-0">
													<label className="font-semibold">Rating</label>
													<input
														type="number"
														value={rating}
														onChange={(e) => handleChange(e)}
														id="rating"
														className="h-8 bg-transparent border mt-2 rounded-lg px-2 focus:outline-none focus:shadow-sm"
													/>
												</div>
												<div className="flex flex-col mt-4 lg:mt-0">
													<label className="font-semibold">
														Count-In-Stock
													</label>
													<input
														type="number"
														value={countInStock}
														onChange={(e) => handleChange(e)}
														id="countInStock"
														className="h-8 bg-transparent border mt-2 rounded-lg px-2 focus:outline-none focus:shadow-sm"
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
						<TabsContent className="w-[1000px]" value="updateProduct">
							<div>
								<input
									type="text"
									value={productId}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setProductId(e.target.value)
									}
									placeholder="Find the Product to update by ID..."
									className="w-[500px] border rounded-lg p-2 focus:outline-none focus:shadow-sm"
								/>
								<UpdateProduct productId={productId} />
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	);
};

export default AdminProductPage;
