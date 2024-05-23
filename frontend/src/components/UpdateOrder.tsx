import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FiEdit } from "react-icons/fi";
import { useUpdateOrderMutation } from "@/slices/OrderSlice";
import { toast } from "react-toastify";

type Props = {
	order: any;
};

const UpdateOrder = ({ order }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	// state for form fields
	const [address, setAddress] = useState<string>(order.shippingAddress.address);
	const [city, setCity] = useState<string>(order.shippingAddress.city);
	const [country, setCountry] = useState<string>(order.shippingAddress.country);
	const [postalCode, setPostalCode] = useState<string>(
		order.shippingAddress.postalCode
	);
	const [zipCode, setZipCode] = useState<string>(order.shippingAddress.zipCode);
	// state for the phone number value
	const [value, setValue] = useState<any>(order.contactInfo);

	const [updateOrder] = useUpdateOrderMutation();

	// function to handle update
	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// create the object to send with the request to the backend
			const updateDetails = {
				shippingAddress: {
					address,
					city,
					country,
					postalCode,
					zipCode,
				},
				contactInfo: value,
			};
			// await on the function to update the order in the DB
			await updateOrder({
				orderId: order._id,
				details: updateDetails,
			});
			// show a success message
			toast.success("Order updated", {
				className: "bg-green-200",
				bodyClassName: "text-black font-poppins font-semibold",
				progressClassName: "bg-transparent",
			});
		} catch (error) {
			toast.error("Something went wrong, try again", {
				className: "bg-red-200",
				bodyClassName: "text-black",
				progressClassName: "bg-transparent",
			});
		}
	};

	return (
		<>
			<div className="flex  justify-between items-start my-4">
				<form>
					<p className="text-gray-400 font-semibold">Order Info</p>
					<div className="flex flex-col">
						<label className="font-semibold">Address:</label>
						<input
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							type="text"
							className={`${
								!edit ? "bg-gray-200" : "bg-transparent"
							} w-96 border border-gray-200 mt-1 rounded-md h-8 px-2 focus:outline-none`}
							disabled={edit ? false : true}
						/>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col mt-2">
							<label className="font-semibold">City:</label>
							<input
								value={city}
								onChange={(e) => setCity(e.target.value)}
								type="text"
								className={`${
									!edit ? "bg-gray-200" : "bg-transparent"
								} border border-gray-200 mt-1 rounded-md h-8 px-2 focus:outline-none`}
								disabled={edit ? false : true}
							/>
						</div>
						<div className="flex flex-col mt-2">
							<label className="font-semibold">Country:</label>
							<input
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								type="text"
								className={`${
									!edit ? "bg-gray-200" : "bg-transparent"
								} border border-gray-200 mt-1 rounded-md h-8 px-2 focus:outline-none`}
								disabled={edit ? false : true}
							/>
						</div>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col mt-2">
							<label className="font-semibold">Postal-Code:</label>
							<input
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								type="text"
								className={`${
									!edit ? "bg-gray-200" : "bg-transparent"
								} border border-gray-200 mt-1 rounded-md h-8 px-2 focus:outline-none`}
								disabled={edit ? false : true}
							/>
						</div>
						<div className="flex flex-col mt-2">
							<label className="font-semibold">Zip-Code:</label>
							<input
								value={zipCode}
								onChange={(e) => setZipCode(e.target.value)}
								type="text"
								className={`${
									!edit ? "bg-gray-200" : "bg-transparent"
								} border border-gray-200 mt-1 rounded-md h-8 px-2 focus:outline-none`}
								disabled={edit ? false : true}
							/>
						</div>
					</div>
					<div className="mt-2">
						<label className="font-semibold">Phone-Number</label>
						<PhoneInput
							className={`mb-4 rounded-md h-10 mt-1 py-2 px-4 bg-transparent border border-gray-200 focus:outline-none ${
								!edit ? "bg-gray-300" : "bg-transparent"
							}`}
							disabled={!edit}
							id="number"
							placeholder="Enter phone number"
							value={value}
							international={true}
							onChange={(newValue) => setValue(newValue as string)}
						/>
					</div>
					{edit && (
						<button
							onClick={handleUpdate}
							className="bg-blue w-full py-2 rounded-md text-light font-semibold text-md duration-500 hover:cursor-pointer hover:bg-cyan-700"
						>
							Save Changes
						</button>
					)}
				</form>
				<button onClick={() => setEdit(!edit)}>
					<FiEdit className="text-lg text-blue" />
				</button>
			</div>
		</>
	);
};

export default UpdateOrder;
