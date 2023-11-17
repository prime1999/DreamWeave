import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/DataTypes/ProductType";

type Props = {
	product: ProductType;
};

const ProductCard = ({ product }: Props) => {
	return (
		<Card className="w-[300px]">
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
					<p className="font-semibold">${product.price}</p>
				</div>
				<CardDescription className="truncate font-semibold text-blue">
					{product.description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
