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
	cart: any;
};

const ProductCard = ({ product, cart }: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state: any) => state.auth);
	const [addItemToCart] = useAddToCartMutation();

	const handleCart = (product: ProductType) => {
		dispatch(addToCart({ ...product, qty: 1 }));
		if (userInfo) {
			addItemToCart({ product: product._id, quantity: 1 });
		}
		navigate("/cart");
	};

	return (
		<Card className="w-[200px] mt-4 hover:cursor-pointer md:w-[280px]">
			<Link to={`/product/${product._id}`}>
				<CardHeader className="w-full">
					<div className="w-full h-[180px] bg-gray-300 flex items-center justify-center md:h-[250px]">
						<img
							className="w-full h-36 scale-[0.8] md:object-scale-down"
							src={product.image}
							alt="product's image"
						/>
					</div>
					<div className="flex justify-between">
						<CardTitle className="w-7/12 font-poppins text-md truncate">
							{product.name}
						</CardTitle>
						<p className="font-semibold text-md">${product.price}</p>
					</div>
					<CardDescription className="truncate font-medium text-md text-blue">
						{product.description}
					</CardDescription>
				</CardHeader>
				<CardContent className="-mt-3">
					<Rating value={product.rating} text={product.numReviews} />
				</CardContent>
			</Link>
			<CardFooter>
				{cart && cart.find((item: any) => item._id === product._id) ? (
					<Link
						to="/cart"
						className="px-4 py-1 border border-blue rounded-full font-semibold duration-500 hover:bg-blue hover:text-white"
					>
						In Cart
					</Link>
				) : (
					<button
						onClick={() => handleCart(product)}
						className="px-4 py-1 border border-blue rounded-full font-semibold duration-500 hover:bg-blue hover:text-white"
					>
						Add to cart
					</button>
				)}
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
