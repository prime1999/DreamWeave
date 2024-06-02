// import { Link } from "react-router-dom";

type Props = {
	pages: number;
	page: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};
const Paginate = ({ pages, page, setPageNumber }: Props) => {
	return (
		<div className="my-8 flex items-center justify-center">
			{[...Array(pages).keys()].map((x) => (
				// <Link
				// 	key={x + 1}
				// 	to={`/page/${x + 1}`}
				// 	className={`font-poppins font-semibold text-black duration-500 mr-2 rounded-[100%] border border-blue w-10 h-10 p-4 flex items-center justify-center hover:bg-blue hover:text-white ${
				// 		x + 1 === page && "bg=blue"
				// 	}`}
				// >
				// 	{x + 1}
				// </Link>
				<button
					key={x + 1}
					className={`font-poppins font-semibold text-black duration-500 mr-2 rounded-[100%] border border-blue w-10 h-10 p-4 flex items-center justify-center hover:bg-blue hover:text-white ${
						x + 1 === page && "bg=blue"
					}`}
					onClick={() => setPageNumber(x + 1)}
				>
					{x + 1}
				</button>
			))}
		</div>
	);
};

export default Paginate;
