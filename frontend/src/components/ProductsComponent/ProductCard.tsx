import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/DataTypes/ProductType";
import Rating from "./Rating";
import { addToCart } from "@/slices/CartSlice";
import { useAddToCartMutation } from "@/slices/CartApiSlice";

type Props = {
	product: ProductType;
};

const ProductCard = ({ product }: Props) => {
	const [qty, setQty] = useState<number>(1);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state: any) => state.auth);
	const [addItemToCart, { isLoading: cartLoading }] = useAddToCartMutation();

	const handleCart = (product: ProductType) => {
		dispatch(addToCart({ ...product, qty }));
		if (userInfo) {
			addItemToCart({ product: product._id, quantity: qty });
		}
		navigate("/cart");
	};

	return (
		<Card className="w-[250px] mt-4 hover:cursor-pointer hover:shadow-md md:w-[300px]">
			<Link to={`/product/${product._id}`}>
				<CardHeader className="w-full">
					<div className="w-full h-[200px]">
						<img
							className="w-full max-h-full"
							src={product.image}
							alt="product's image"
						/>
					</div>
					<div className="flex justify-between">
						<CardTitle className="font-poppins text-md truncate">
							{product.name}
						</CardTitle>
						<p className="font-semibold text-md">${product.price}</p>
					</div>
					<CardDescription className="truncate font-semibold text-blue">
						{product.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Rating value={product.rating} text={product.numReviews} />
				</CardContent>
			</Link>
			<CardFooter>
				<button
					onClick={() => handleCart(product)}
					className="px-4 py-1 border border-blue rounded-full font-semibold duration-500 hover:bg-blue hover:text-white"
				>
					Add to cart
				</button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
