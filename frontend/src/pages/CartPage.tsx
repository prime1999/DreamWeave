import { ProductType } from "@/DataTypes/ProductType";
import { useSelector } from "react-redux";
import CartItems from "@/components/CartItems";

const CartPage = () => {
	const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
		useSelector((state) => (state as any).cart);

	return (
		<>
			<div className="w-10/12 mx-auto mb-8">
				<hr className="mt-4 mb-8" />
				{cartItems && (
					<div className="flex justify-between">
						<div className="w-2/3 border rounded-3xl p-8">
							<div className="flex justify-between items-center">
								<div className="flex items-end">
									<h1 className="font-semibold text-2xl">Cart</h1>
									<p className="text-gray-300 text-sm mb-1 ml-2">
										({cartItems.length} products)
									</p>
								</div>
								<button className="text-red-500 font-semibold">
									X Clear Cart
								</button>
							</div>
							<div className="mt-4">
								{cartItems.map((item: ProductType) => (
									<CartItems key={item._id} item={item} />
								))}
							</div>
						</div>
						<div className="w-1/3 ml-4 bg-gray-200 rounded-3xl">
							<form className="relative h-full w-11/12 mx-auto my-4">
								<h6 className="my-2 font-semibold">Promo Code</h6>
								<div className="relative">
									<input
										type="text"
										placeholder="Type here..."
										className="w-full bg-transparent text-black border border-gray-300 rounded-full px-8 py-3 focus:outline-none"
									/>
									<button className="absolute right-2 top-1 rounded-3xl bg-black text-light px-8 py-2 font-semibold">
										Apply
									</button>
								</div>
								<hr className="my-4 border-gray-300" />
								<div className="mt-8">
									<span className="flex justify-between text-gray-400">
										<p className="">Subtotal</p>
										<p>${itemsPrice}</p>
									</span>
									<span className="flex justify-between my-4 text-gray-400">
										<p className="">Shipping</p>
										<p>${shippingPrice}</p>
									</span>
									<span className="flex justify-between mb-4 text-gray-400">
										<p className="">Tax</p>
										<p>${taxPrice}</p>
									</span>
									<span className="flex justify-between font-semibold">
										<p className="">Total</p>
										<p className="text-lg">${totalPrice}</p>
									</span>
								</div>
								<button className="absolute bottom-8 w-full py-2 mx-auto bg-black text-light rounded-xl text-center">
									Place Order
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CartPage;