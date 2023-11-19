import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const RootLayouts = () => {
	return (
		<div className="">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default RootLayouts;
