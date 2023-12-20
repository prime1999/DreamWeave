import { Link } from "react-router-dom";
import {
	FaProductHunt,
	FaShippingFast,
	FaUsers,
	FaQuestionCircle,
} from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { IoIosChatbubbles } from "react-icons/io";
import SalesChart from "@/Charts/SalesChart";

const RevenuePage = () => {
	return (
		<>
			<hr />
			<nav className="w-8/12 mx-auto mt-4">
				<ul className="flex items-center justify-between text-gray-500 text-sm">
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light active:bg-blue active:text-light"
						>
							<FaProductHunt className="mr-2" />
							Products
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaShippingFast className="mr-2" />
							Orders
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaUsers className="mr-2" />
							Users
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<TbPigMoney className="mr-2" />
							Finance
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<FaQuestionCircle className="mr-2" />
							FAQ
						</Link>
					</li>
					<li>
						<Link
							to="/"
							className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
						>
							<IoIosChatbubbles className="mr-2" />
							Support
						</Link>
					</li>
				</ul>
			</nav>
			<div className="w-11/12 mx-auto">
				<div className="p-4 shadow-md  flex items-center justify-between rounded-lg">
					<div className="w-[70%]">
						<h1 className="font-semibold text-lg">Revenue</h1>
						<SalesChart />
					</div>
					<h1>sales revenue</h1>
				</div>
			</div>
		</>
	);
};

export default RevenuePage;
