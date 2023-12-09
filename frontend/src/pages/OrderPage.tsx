import { useSelector, useDispatch } from "react-redux";

const OrderPage = () => {
	const { userInfo } = useSelector((state: any) => state.auth);

	return (
		<div className="container w-9/12 text-black">
			<h1 className="text-center font-poppins text-2xl font-semibold">
				Place your Order
			</h1>
			<p className="text-center font-cour text-gray-300">
				Cancel anytime . worldwide shipping
			</p>
			<div className="flex mt-8 w-full">
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
								className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
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
									className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
								/>
							</div>
							<div className="flex justify-between mb-4">
								<div>
									<label>City</label>
									<input
										type="text"
										className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
									/>
								</div>
								<div>
									<label>Zip/Postal</label>
									<input
										type="text"
										className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
									/>
								</div>
							</div>
							<div className="flex justify-between mb-4">
								<div>
									<label>Country</label>
									<input
										type="text"
										className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
									/>
								</div>
								<div>
									<label>Zip code</label>
									<input
										type="text"
										className="w-full border px-4 py-2 bg-transparent mt-2 capitalize focus:outline-none"
									/>
								</div>
							</div>
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
					<button className="w-full text-center text-light bg-blue py-2 mt-4 tracking-widest uppercase duration-500 hover:bg-cyan-700">
						Complete Purchase
					</button>
				</div>
				<div className="border ml-4 p-4">
					<div>
						<h5 className="font-semibold text-lg">Order Summary</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
