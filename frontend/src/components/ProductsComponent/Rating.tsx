import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
	value: number;
	text: number;
};
const Rating = ({ value, text }: Props) => {
	return (
		<div className="flex items-center text-green-500">
			<span>
				{value >= 1 ? (
					<FaStar />
				) : value >= 0.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{value >= 2 ? (
					<FaStar />
				) : value >= 1.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{value >= 3 ? (
					<FaStar />
				) : value >= 2.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{value >= 4 ? (
					<FaStar />
				) : value >= 3.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span>
				{value >= 5 ? (
					<FaStar />
				) : value >= 4.5 ? (
					<FaStarHalfAlt />
				) : (
					<FaRegStar />
				)}
			</span>
			<span className="text-gray-400 ml-2 font-normal">(${text})</span>
		</div>
	);
};

export default Rating;
