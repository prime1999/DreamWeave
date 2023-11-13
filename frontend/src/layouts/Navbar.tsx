import logo from "../assets/images/logo.png";

const Navbar = () => {
	return (
		<div>
			<div className="w-12 flex items-end py-4">
				<img src={logo} alt="logo" />
				<h1 className="font-kenia text-xl mb-1 ml-1 text-black">DREAMWEAVE</h1>
			</div>
		</div>
	);
};

export default Navbar;
