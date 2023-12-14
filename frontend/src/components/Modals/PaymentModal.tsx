import { useState } from "react";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { useGetAnOrderQuery } from "@/slices/OrderSlice";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import PaypalProvider from "../PaypalProvider";

type Props = {
	orderId: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentModal = ({ orderId, open, setOpen }: Props) => {
	const { data, isLoading, refetch } = useGetAnOrderQuery({ orderId });

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className="w-full"></DialogTrigger>
				{data &&
					data.map((order: any) => (
						<>
							<DialogContent className="w-[400px] h-[600px] rounded-lg shadow-light text-black  overflow-y-auto md:w-[500px]">
								<DialogHeader>
									<DialogTitle className="mb-2 text-center font-bold">
										<h4>Make Your Payment</h4>
									</DialogTitle>
									<hr />
									<DialogDescription className="text-black">
										<p className="font-bold text-lg">Order Details</p>
										<p className="font-semibold text-lg">#45687923</p>
										<div className="flex justify-between items-center mt-4 text-md">
											<div>
												<p className="text-gray-400 font-semibold mb-2">
													Order Date
												</p>
												<p className="font-semibold">24th November, 2023</p>
											</div>
											<div>
												<p className="text-gray-400 font-semibold mb-2">
													Payment
												</p>
												<p className="font-semibold">{order.paymentMethod}</p>
											</div>
											<div>
												<p className="text-gray-400 font-semibold mb-2">
													Status
												</p>
												<p
													id={`${order.status}`}
													className="px-4 py-1 rounded-md font-semibold"
												>
													{order.status}
												</p>
											</div>
										</div>
										<div className="flex  justify-between items-end my-4">
											<div>
												<p className="text-gray-400 font-semibold">Address</p>
												<p className="font-semibold">
													{order.shippingAddress.address},{" "}
													{order.shippingAddress.city},{" "}
													{order.shippingAddress.country}
												</p>
											</div>
											<MdEdit className="text-lg text-blue" />
										</div>
										<hr />
										<div className="my-4">
											{order.items.map((item: any) => (
												<div className="flex items-center justify-between mt-2">
													<img
														src={item.product.image}
														alt={item.product.name}
														className="w-24"
													/>
													<div className="w-48">
														<p className="font-semibold">{item.product.name}</p>
														<p className="text-gray-400">
															{item.product.brand}
														</p>
													</div>
													<div>
														<p>
															Qty: <span>{item.quantity}</span>
														</p>
													</div>
													<p className="font-semibold">${item.product.price}</p>
												</div>
											))}
										</div>
										<div>
											<div className="flex items-center justify-between">
												<p className="text-gray-400 font-semibold">Subtotal</p>
												<p className="font-semibold">${order.itemsPrice}</p>
											</div>
											<div className="flex items-center justify-between">
												<p className="text-gray-400 font-semibold">Shipping</p>
												<p className="font-semibold">${order.shippingPrice}</p>
											</div>
											<div className="flex items-center justify-between">
												<p className="text-gray-400 font-semibold">Tax</p>
												<p className="font-semibold">{order.taxPrice}</p>
											</div>
											<div className="flex items-center justify-between mb-4">
												<p className="text-gray-400 font-semibold">Discount</p>
												<p className="font-semibold">$0</p>
											</div>
											<hr />
											<div className="my-4 flex items-center justify-between">
												<p className="text-lg font-bold">Total</p>
												<p className="text-lg font-bold">
													${order.totalAmount}
												</p>
											</div>
											<hr />
										</div>
										<DialogClose asChild>
											<div className="flex items-center justify-between mt-4">
												{/* <button className="bg-red-500 px-4 py-2 rounded-lg w-24 duration-500 text-light font-semibold hover:bg-red-600">
													Cancel
												</button>
												<button className="px-4 py-2 rounded-lg text-white font-semibold duration-500 bg-blue hover:bg-cyan-800">
													Pay with PayPal
												</button> */}
												<PaypalProvider
													setOpen={setOpen}
													refetch={refetch}
													order={order}
												/>
											</div>
										</DialogClose>
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</>
					))}
			</Dialog>
		</div>
	);
};

export default PaymentModal;
