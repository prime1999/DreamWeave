import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductType } from "@/DataTypes/ProductType";
import DeleteCartModal from "./Modals/DeleteCartModal";
import { addToCart } from "@/slices/CartSlice";

type Props = {
	item: ProductType;
};

const CartItems = ({ item }: Props) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState<number>(item.qty ? item.qty : 1);

	const handleCountIncrease = (item: any) => {
		if (qty === item?.countInStock) {
			setQty(item.countInStock as number);
		} else {
			setQty((prevState) => prevState + 1);
		}
		dispatch(addToCart({ ...item, qty: item.qty + 1 }));
	};

	const handleCountDecrease = () => {
		if (qty > 1) {
			setQty((prevState) => prevState - 1);
		} else {
			setQty(1);
		}
		dispatch(
			addToCart({
				...item,
				qty: typeof item.qty === "number" && item.qty > 1 ? item.qty - 1 : 1,
			})
		);
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
					<p className="text-gray-500">{item.brand}</p>
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
			<DeleteCartModal itemId={item._id as string}>
				<button className="hidden text-red-500 font-bold md:block">X</button>
			</DeleteCartModal>
			<DeleteCartModal itemId={item._id as string}>
				<button className="bg-red-500 text-white rounded-md p-2 font-bold ml-16 duration-500 hover:bg-red-600 md:hidden">
					Remove Item
				</button>
			</DeleteCartModal>
		</div>
	);
};

export default CartItems;
