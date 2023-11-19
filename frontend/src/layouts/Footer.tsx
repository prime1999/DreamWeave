import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="w-full h-[200px]">
			<div
				className="relative w-full h-3/4"
				style={{
					backgroundImage: `url(${logo})`,
					backgroundSize: "10%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "50%",
				}}
			>
				<div
					className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
				>
					<div>
						<ul className="flex items-center text-light font-semibold">
							<li className="hover:text-gray-400">
								<Link to="/">Contact</Link>
							</li>
							<li className="mx-4 hover:text-gray-400">
								<Link to="/">FAQs</Link>
							</li>
							<li className="hover:text-gray-400">
								<Link to="/">Shopping</Link>
							</li>
							<li className="mx-4 hover:text-gray-400">
								<Link to="/">Returns</Link>
							</li>
							<li>
								<Link to="/">Terms</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="w-full h-1/3">
				<div className="w-11/12 mx-auto pt-6 font-cour flex items-center justify-between">
					<h6>&copy; 2023 Eminence</h6>
					<div>
						<ul className="flex">
							<li>
								<FaTwitter />
							</li>
							<li className="mx-4">
								<FaInstagram />
							</li>
							<li>
								<FaFacebook />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
