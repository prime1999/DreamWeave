import { useState } from "react";
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
import { getFullDate } from "@/utils/dateUtils";
import UpdateOrder from "../UpdateOrder";

type Props = {
	orderId: string;
};

const OrderDetailsModal = ({ orderId }: Props) => {
	const [open, setOpen] = useState<boolean>(true);

	const { data, isLoading, refetch } = useGetAnOrderQuery({ orderId });

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className="w-full"></DialogTrigger>
				{data &&
					data.map(
						(order: any) =>
							order._id === orderId && (
								<>
									<DialogContent
										key={order._id}
										className="w-[400px] h-[600px] rounded-lg shadow-light text-black  overflow-y-auto md:w-[500px]"
									>
										<DialogHeader>
											<DialogTitle className="mb-2 text-center font-bold">
												<h4>Order Details</h4>
											</DialogTitle>
											<hr />
											<DialogDescription className="text-black">
												<p className="font-bold text-md">Order ID: #45687923</p>
												<p className="text-md">
													{getFullDate(order.createdAt)}
												</p>
												<button
													id={order.status}
													className="capitalize px-4 py-1 mt-2 rounded-3xl"
												>
													{order.status}
												</button>
												<UpdateOrder order={order} />
												{order.status !== "pending" && (
													<>
														<hr />
														<div className="my-2">
															<h6 className="font-semibold text-lg">
																Payment Info
															</h6>
															<div>
																<ul>
																	<li className="text-gray-400">
																		Payment-method:
																		<span className="text-black ml-2 font-semibold">
																			{order.paymentMethod}
																		</span>
																	</li>
																	<li className="text-gray-400 my-2">
																		Email:
																		<span className="text-black ml-2 font-semibold">
																			{order.paymentResult.email_address}
																		</span>
																	</li>
																	<li className="text-gray-400 mb-2">
																		Status:
																		<span className="text-black ml-2 font-semibold">
																			{order.paymentResult.status}
																		</span>
																	</li>
																	<li className="text-gray-400">
																		Payment-time:
																		<span className="text-black ml-2 font-semibold">
																			{getFullDate(
																				order.paymentResult.update_time
																			)}
																		</span>
																	</li>
																</ul>
															</div>
														</div>
													</>
												)}
												<hr />
												<div className="my-4">
													{order.items.map((item: any) => (
														<div
															key={item._id}
															className="w-full flex items-center justify-between mt-2"
														>
															<img
																src={item.product.image}
																alt={item.product.name}
																className="w-12"
															/>
															<div className="w-48">
																<p className="font-semibold">
																	{item.product.name}
																</p>
																<p className="text-gray-400">
																	{item.product.brand}
																</p>
															</div>
															<div>
																<p>
																	Qty: <span>{item.quantity}</span>
																</p>
															</div>
															<p className="font-semibold">
																${item.product.price}
															</p>
														</div>
													))}
												</div>
												<div>
													<div className="flex items-center justify-between">
														<p className="text-gray-400 font-semibold">
															Subtotal
														</p>
														<p className="font-semibold">${order.itemsPrice}</p>
													</div>
													<div className="flex items-center justify-between">
														<p className="text-gray-400 font-semibold">
															Shipping
														</p>
														<p className="font-semibold">
															${order.shippingPrice}
														</p>
													</div>
													<div className="flex items-center justify-between">
														<p className="text-gray-400 font-semibold">Tax</p>
														<p className="font-semibold">{order.taxPrice}</p>
													</div>
													<div className="flex items-center justify-between mb-4">
														<p className="text-gray-400 font-semibold">
															Discount
														</p>
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
														{order.status === "pending" && (
															<PaypalProvider
																setOpen={setOpen}
																refetch={refetch}
																order={order}
															/>
														)}
													</div>
												</DialogClose>
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</>
							)
					)}
			</Dialog>
		</div>
	);
};

export default OrderDetailsModal;
