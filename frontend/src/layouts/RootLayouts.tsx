import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const RootLayouts = () => {
	return (
		<div className="container mx-auto">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default RootLayouts;
