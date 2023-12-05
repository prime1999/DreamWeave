import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "@/DataTypes/ProductType";
import DeleteCartModal from "./Modals/DeleteCartModal";

type Props = {
	item: ProductType;
};

const CartItems = ({ item }: Props) => {
	const [qty, setQty] = useState<number>(1);
	const handleCountIncrease = (item: ProductType) => {
		if (qty === item?.countInStock) {
			setQty(item.countInStock as number);
		} else {
			setQty((prevState) => prevState + 1);
		}
	};

	const handleCountDecrease = () => {
		if (qty > 1) {
			setQty((prevState) => prevState - 1);
		} else {
			setQty(1);
		}
	};

	return (
		<div
			key={item._id}
			className="flex flex-col items-center justify-between p-4 border rounded-3xl mb-4 px-4 md:flex-row"
		>
			<div className="flex flex- items-center w-72">
				<Link className="w-28 h-24" to={`/product/${item._id}`}>
					<img className="w-full h-full" src={item.image} alt="" />
				</Link>
				<div className="ml-4 flex flex-col">
					<h6 className="font-semibold truncate">{item.name}</h6>
					<p className="text-gray-300">{item.brand}</p>
				</div>
			</div>
			<div className="flex items-center justify-center ml-16 font-normal">
				<button
					onClick={() => handleCountDecrease()}
					className="rounded-[100%] w-10 h-10 flex items-center justify-center border px-2 py-1 text-2xl leading-[10px] hover:bg-light"
				>
					-
				</button>
				<p className="mx-2">{qty}</p>
				<button
					onClick={() => handleCountIncrease(item)}
					className="rounded-[100%] w-10 h-10 flex items-center justify-center border px-2 py-1 text-2xl leading-[10px] hover:bg-light"
				>
					+
				</button>
			</div>
			<h6 className="font-semibold ml-8 my-4">${item.price}</h6>
			<DeleteCartModal itemId={item._id}>
				<button className="hidden text-red-500 font-bold md:block">X</button>
			</DeleteCartModal>
			<button className="bg-red-500 text-white rounded-md p-2 font-bold ml-16 duration-500 hover:bg-red-600 md:hidden">
				Remove Item
			</button>
		</div>
	);
};

export default CartItems;
