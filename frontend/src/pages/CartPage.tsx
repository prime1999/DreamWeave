import { useState } from "react";
import { ProductType } from "@/DataTypes/ProductType";
import { useSelector } from "react-redux";
import CartItems from "@/components/CartItems";

const CartPage = () => {
	const { cartItems } = useSelector((state) => (state as any).cart);

	return (
		<>
			<div className="w-10/12 mx-auto my-8">
				{cartItems && (
					<>
						<div className="border rounded-3xl p-8">
							<div className="flex justify-between items-center">
								<div className="flex items-end">
									<h1 className="font-semibold text-2xl">Cart</h1>
									<p className="text-gray-300 text-sm mb-1 ml-2">
										({cartItems.length} products)
									</p>
								</div>
								<h3 className="text-red-500 font-semibold">X Clear Cart</h3>
							</div>
							<div className="mt-4">
								{cartItems.map((item: ProductType) => (
									<CartItems key={item._id} item={item} />
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CartPage;
