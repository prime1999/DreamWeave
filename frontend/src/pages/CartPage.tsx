import { useSelector } from "react-redux";
import { ProductType } from "@/DataTypes/ProductType";
import CartItems from "@/components/CartItems";
import ClearCartModal from "@/components/Modals/ClearCartModal";
import { Link } from "react-router-dom";
import PagesNavBar from "@/layouts/PagesNavBar";

const CartPage = () => {
	const { cartItems, itemsPrice } = useSelector((state) => (state as any).cart);

	return (
		<>
			<PagesNavBar />
			{cartItems.length === 0 ? (
				<>
					<div className="flex items-center justify-center">
						<div className="mt-16 flex flex-col items-center">
							<h1 className="font-poppins font-bold text-4xl">CART EMPTY</h1>
							<Link
								className="bg-blue p-4 mt-4 rounded-md text-light font-semibold duration-500 hover:cursor-pointer hover:bg-cyan-700"
								to="/"
							>
								Start Shopping
							</Link>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="w-11/12 mx-auto mb-8">
						<hr className="mt-4 mb-8" />
						{cartItems && (
							<div className="flex items-start flex-col justify-between md:flex-row">
								<div className="w-full border rounded-3xl p-8 md:w-2/3">
									<div className="flex justify-between items-center">
										<div className="flex items-end">
											<h1 className="font-semibold text-2xl">Cart</h1>
											<p className="text-gray-300 text-sm mb-1 ml-2">
												({cartItems.length} products)
											</p>
										</div>
										<ClearCartModal>
											<button className="text-red-500 font-semibold">
												X Clear Cart
											</button>
										</ClearCartModal>
									</div>
									<div className="mt-4">
										{cartItems.map((item: ProductType) => (
											<CartItems key={item._id} item={item} />
										))}
									</div>
								</div>
								<div className="w-full mt-4 bg-gray-200 rounded-3xl md:w-1/3 md:mt-0 md:ml-4">
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
												<p className="">Discount</p>
												<p>$0</p>
											</span>
										</div>
										<Link
											to="/login?redirect=/order"
											className="flex items-center justify-center mt-4 w-full py-2 px-36 mx-auto bg-black text-light rounded-xl text-center"
										>
											Place Order
										</Link>
									</form>
								</div>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default CartPage;
