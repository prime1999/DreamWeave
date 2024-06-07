import { format } from "date-fns";
import Rating from "./ProductsComponent/Rating";

type Props = {
	review: {
		user: {
			id: string;
			pic: string;
		};
		name: string;
		rating: number;
		comment: string;
		id: string;
		createdAt: string;
		updatedAt: string;
	};
};

const ProductReviewCard = ({ review }: Props) => {
	return (
		<div className="rounded-lg shadow-md p-8 bg-gray-200">
			<div className="flex items-center gap-2 mb-4">
				<img
					src={review?.user?.pic}
					alt={review?.name}
					className="w-12 h-12 rounded-full"
				/>
				<div className="w-full flex justify-between items-center">
					<h6>{review?.name}</h6>
					<p className="text-sm">
						{format(new Date(review.createdAt), "dd MMM")}
					</p>
				</div>
			</div>
			<Rating value={review?.rating} text={0} />
			<p className="mt-4 text-sm">{review?.comment}</p>
		</div>
	);
};

export default ProductReviewCard;
