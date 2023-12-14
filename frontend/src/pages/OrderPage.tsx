import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { usePlaceOrderMutation, useGetAnOrderQuery } from "@/slices/OrderSlice";
import { useClearCartMutation } from "@/slices/CartApiSlice";
import Loader from "@/components/Loader";
import { clearCartItems } from "@/slices/CartSlice";
import PaymentModal from "@/components/Modals/PaymentModal";

const OrderPage = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state: any) => state.auth);
	const { itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector(
		(state: any) => state.cart
	);
	const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
	const [clearCart] = useClearCartMutation();

	type formDataType = {
		address: string;
		city: string;
		country: string;
		postalCode: string;
		zipCode: string;
	};

	const [formData, setFormData] = useState<formDataType>({
		address: "",
		city: "",
		country: "",
		postalCode: "",
		zipCode: "",
	});
	// state for the phone number value
	const [value, setValue] = useState<string>("");
	const [paymentMethod, setPaymentMethod] = useState<string>("PayPal");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [resId, setResId] = useState<string>("");

	let { address, city, country, postalCode, zipCode } = formData;

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handlePlaceOrder = async () => {
		try {
			console.log(value);
			const shippingDetails = {
				shippingAddress: formData,
				phoneNumber: value,
			};
			const res = await placeOrder({
				shippingDetails,
				paymentMethod,
			});
			const { data } = res as any;
			setResId(data._id);
			setOpenModal(true);
			await clearCart({});
			dispatch(clearCartItems());
			address = "";
			city = "";
			country = "";
			postalCode = "";
			zipCode = "";
		} catch (error) {
			// throw an error if they don't
			toast.error("Something went wrong, please try again", {
				className: "bg-red-200",
				bodyClassName: "text-light",
				progressClassName: "bg-transparent",
			});
		}
	};

	if (orderLoading) {
		return <Loader />;
	}

	return (
		<>
			<div className="container w-9/12 text-black">
				<h1 className="text-center font-poppins text-2xl font-semibold">
					Place your Order
				</h1>
				<p className="text-center font-cour text-gray-300">
					Cancel anytime . worldwide shipping
				</p>
				<div className="flex items-start mt-8 w-full">
					<div className="w-2/3">
						<div className="border p-4 mb-4">
							<form>
								<h6 className="font-semibold uppercase text-lg mb-4">
									1. Personal Information
								</h6>
								<label className="text-gray-400">Customer's Name</label>
								<input
									type="text"
									value={userInfo.name}
									disabled
									className="w-full border px-4 py-2 bg-transparent mt-2 mb-8 capitalize focus:outline-none"
								/>
								<label className="text-gray-400">Customer's Email</label>
								<input
									type="text"
									value={userInfo.email}
									disabled
									className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
								/>
							</form>
						</div>
						<div className="border p-4">
							<form>
								<h6 className="font-semibold uppercase text-lg mb-4">
									2. Shipping Address
								</h6>
								<div className="mb-4">
									<label>Address</label>
									<input
										type="text"
										id="address"
										value={address}
										onChange={(e) => handleChangeInput(e)}
										className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
									/>
								</div>
								<div className="flex justify-between mb-4">
									<div>
										<label>City</label>
										<input
											type="text"
											id="city"
											value={city}
											onChange={(e) => handleChangeInput(e)}
											className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
										/>
									</div>
									<div>
										<label>Zip/Postal</label>
										<input
											type="number"
											id="postalCode"
											value={postalCode}
											onChange={(e) => handleChangeInput(e)}
											className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
										/>
									</div>
								</div>

								<div className="flex justify-between mb-4">
									<div>
										<label>Country</label>
										<input
											type="text"
											id="country"
											value={country}
											onChange={(e) => handleChangeInput(e)}
											className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
										/>
									</div>
									<div>
										<label>Zip code</label>
										<input
											type="number"
											id="zipCode"
											value={zipCode}
											onChange={(e) => handleChangeInput(e)}
											className="w-full border px-4 py-2 bg-transparent mt-2 focus:outline-none"
										/>
									</div>
								</div>
								<PhoneInput
									className={`custom-phone-input mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none`}
									placeholder="Enter phone number"
									value={value}
									international={true}
									onChange={(newValue) => setValue(newValue as string)}
								/>
							</form>
						</div>
						<div className="border p-4 mt-4">
							<h6 className="font-semibold uppercase text-lg mb-4">
								3. Payment Method
							</h6>
							<div className="flex items-center">
								<span className="relative flex justify-center items-center border border-blue w-4 h-4 bg-transparent rounded-[100%] p-1">
									<span className="absolute bg-blue w-2 h-2 rounded-[100%]"></span>
								</span>
								<p className="ml-2 font-semibold">PayPal</p>
							</div>
						</div>
						<button
							onClick={handlePlaceOrder}
							className="w-full text-center text-light bg-blue py-2 mt-4 tracking-widest uppercase duration-500 hover:bg-cyan-700"
						>
							Place Your Order
						</button>
					</div>
					<div className="w-1/3 ml-4">
						<div className="w-full border p-4">
							<div>
								<h5 className="font-semibold text-lg text-center">
									Order Summary
								</h5>
								<hr className="mt-8" />
								<div className="flex items-center justify-between mt-4">
									<h6 className="font-semibold">Subtotal</h6>
									<p className="font-semibold">${itemsPrice}</p>
								</div>
								<div className="flex items-center justify-between mt-4">
									<h6 className="font-semibold">Shipping</h6>
									<p className="font-semibold">${shippingPrice}</p>
								</div>
								<div className="flex items-center justify-between mt-4">
									<h6 className="font-semibold">Estimated</h6>
									<p className="font-semibold">${taxPrice}</p>
								</div>
								<hr className="mt-4" />
								<div className="flex items-center justify-between my-2">
									<h6 className="font-bold text-lg">Subtotal</h6>
									<p className="font-bold text-lg">${totalPrice}</p>
								</div>
							</div>
						</div>
						<button
							onClick={handlePlaceOrder}
							className="w-full text-center text-light bg-blue py-2 mt-2 tracking-widest uppercase duration-500 hover:bg-cyan-700"
						>
							Place Your Order
						</button>
					</div>
				</div>
			</div>
			{openModal && (
				<PaymentModal orderId={resId} open={openModal} setOpen={setOpenModal} />
			)}
		</>
	);
};

export default OrderPage;
