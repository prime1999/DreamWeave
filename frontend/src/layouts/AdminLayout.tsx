import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
	FaProductHunt,
	FaShippingFast,
	FaUsers,
	FaQuestionCircle,
} from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { IoIosChatbubbles } from "react-icons/io";
import { useEffect, useState } from "react";

const AdminLayout = () => {
	const [path, setPath] = useState("");
	const location = useLocation();

	useEffect(() => {
		const pathObj = location.pathname.split("/");
		let path = pathObj[3];
		setPath(path);
	}, [location]);
	const { userInfo } = useSelector((state: any) => state.auth);
	return (
		<div>
			<hr />
			<h1 className="mt-4 ml-16 text-3xl font-bold text-blue">
				Welcome back, <span className="capitalize">{userInfo.name}</span>
			</h1>
			<nav className="hidden w-8/12 mx-auto mt-4 md:block">
				<ul className="flex items-center justify-between text-gray-500 text-sm">
					<li>
						<Link
							to="/admin/dashboard/products"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "products" && "bg-blue text-light"
							}`}
						>
							<FaProductHunt className="mr-2" />
							Products
						</Link>
					</li>
					<li>
						<Link
							to="/admin/dashboard/orders"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "orders" && "bg-blue text-light"
							}`}
						>
							<FaShippingFast className="mr-2" />
							Orders
						</Link>
					</li>
					<li>
						<Link
							to="/admin/dashboard/users"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "users" && "bg-blue text-light"
							}`}
						>
							<FaUsers className="mr-2" />
							Users
						</Link>
					</li>
					<li>
						<Link
							to="/admin/dashboard/sales"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "sales" && "bg-blue text-light"
							}`}
						>
							<TbPigMoney className="mr-2" />
							Statistics
						</Link>
					</li>
					<li>
						<Link
							to="/admin/dashboard/faq"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "faq" && "bg-blue text-light"
							}`}
						>
							<FaQuestionCircle className="mr-2" />
							FAQ
						</Link>
					</li>
					<li>
						<Link
							to="/admin/dashboard/support"
							className={`flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light ${
								path === "support" && "bg-blue text-light"
							}`}
						>
							<IoIosChatbubbles className="mr-2" />
							Support
						</Link>
					</li>
				</ul>
			</nav>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
