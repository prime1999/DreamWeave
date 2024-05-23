import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const RootLayouts = () => {
	return (
		<div className="flex flex-col min-h-screen m-0">
			<div className="grow mb-8">
				<Outlet />
			</div>
			<div className="shrink-0">
				<Footer />
			</div>
		</div>
	);
};

export default RootLayouts;
