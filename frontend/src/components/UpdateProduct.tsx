import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/images/logo.png";
import {
	useUploadProductImageMutation,
	useGetSinlgeProductQuery,
	useUpdateProductMutation,
} from "@/slices/ProductSlice";
import Loader from "./Loader";

type Props = {
	productId: string;
};

const UpdateProduct = ({ productId }: Props) => {
	type FormDataType = {
		[key: string]: string | number;
		name: string;
		brand: string;
		price: number;
		rating: number;
		countInStock: number;
		description: string;
	};
	const { data, isLoading, error } = useGetSinlgeProductQuery({
		productId,
	});
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

	useEffect(() => {
		// update the form value when the data for the product to update is available
		setFormData({
			name: data?.name || "",
			brand: data?.brand || "",
			price: data?.price || 0,
			rating: data?.rating || 0,
			countInStock: data?.countInStock || 0,
			description: data?.description || "",
		});
		setCategory(data?.category || "");
		setPic(data?.image || logo);
	}, [data]);

	let { name, brand, price, rating, countInStock, description } = formData;

	// get the function to upload the image from the slice
	const [uploadImage, { isLoading: uploadLoading }] =
		useUploadProductImageMutation();
	// get the function to update the product from the slice
	const [productUpdate, { isLoading: updateLoading }] =
		useUpdateProductMutation();

	// function to set the value of the form data
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to handle image upload to the backend
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			// create a new form data for the file
			const formData = new FormData();
			// append the first file form the list of choosen files (for single file upload)
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
				// TODO // show error message
				console.log(error);
			}
		}
	};

	const handleUpdateProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		// check if the fields are not empty before sending it to the backend
		const emptyProperties = [];
		// iterate the formData to know which field is not filled
		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				const value = formData[key];

				// Check for empty string or 0
				if (value === "" || value === 0) {
					emptyProperties.push(key);
				}
			}
		}
		// check if all fields are filled
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
				// await on the function to update the product in the DB
				await productUpdate({ productDetails, id: productId }).unwrap();
				//show a success message
				toast.success("Product Updated", {
					className: "bg-green-200",
					bodyClassName: "text-black font-poppins font-semibold",
					progressClassName: "bg-transparent",
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			{isLoading && <Loader />}
			{error ? (
				<div className="flex items-center justify-center h-[300px] w-[1200px]">
					<h1 className="font-semibold text-3xl text-blue ">
						Please input a valid ID
					</h1>
				</div>
			) : (
				<>
					{data && productId !== "" ? (
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
									onSubmit={handleUpdateProduct}
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
													<SelectValue placeholder={category} />
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
												<label className="font-semibold">Count-In-Stock</label>
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
										UPDATE PRODUCT
									</button>
								</form>
							</div>
						</div>
					) : (
						<div className="flex items-center justify-center h-[300px] w-[1200px]">
							<h1 className="font-semibold text-3xl text-blue ">
								Find a Product By ID
							</h1>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UpdateProduct;
