import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const RootLayouts = () => {
	return (
		<div className="">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default RootLayouts;
