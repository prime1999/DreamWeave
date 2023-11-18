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

type Props = {
	product: ProductType;
};

const ProductCard = ({ product }: Props) => {
	return (
		<Card className="w-[300px] mt-4 hover:cursor-pointer hover:shadow-md">
			<CardHeader className="w-full">
				<div className="w-full h-[250px]">
					<img
						className="w-full max-h-[250px]"
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
			<CardFooter>
				<button className="px-4 py-1 border border-blue rounded-full font-semibold duration-500 hover:bg-blue hover:text-white">
					Add to cart
				</button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
