import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

type Props = {
	pages: number;
	page: number;
	setPageNumber?: any;
	setDetails?: any;
};
const Paginate = ({ pages, page, setPageNumber, setDetails }: Props) => {
	const params = useParams();
	if (params.category) {
		console.log(params);
	}
	return (
		<div className="my-8 flex items-center justify-center">
			{[...Array(pages).keys()].map((x) =>
				!params.category ? (
					<Link
						key={x + 1}
						to={`/page/${x + 1}`}
						onClick={() => {
							setPageNumber(x + 1);
						}}
						className={`font-poppins font-semibold text-black duration-500 mr-2 rounded-[100%] border border-blue w-10 h-10 p-4 flex items-center justify-center hover:bg-blue hover:text-white ${
							x + 1 === page && "bg=blue"
						}`}
					>
						{x + 1}
					</Link>
				) : (
					<button
						key={x + 1}
						className={`font-poppins font-semibold text-black duration-500 mr-2 rounded-[100%] border border-blue w-10 h-10 p-4 flex items-center justify-center hover:bg-blue hover:text-white ${
							x + 1 === page && "bg=blue"
						}`}
						onClick={() => {
							setPageNumber(x + 1);
							setDetails((prevstate: any) => ({
								...prevstate,
								pageNumber: x + 1,
							}));
						}}
					>
						{x + 1}
					</button>
				)
			)}
		</div>
	);
};

export default Paginate;
