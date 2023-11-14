import { HiMagnifyingGlass } from "react-icons/hi2";
import { TbShoppingCartPlus } from "react-icons/tb";
import { MdPersonPin } from "react-icons/md";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import laptop from "../assets/images/d1.jpg";
import phone from "../assets/images/d2.jpg";
import watch from "../assets/images/d9.webp";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
const Navbar = () => {
	return (
		<div className="flex items-center justify-between px-8">
			<Link to="/" className="flex items-center py-4 font-poppins">
				<img className="w-12" src={logo} alt="logo" />
				<h1 className="font-kenia text-xl ml-1 text-black">DREAMWEAVE</h1>
			</Link>
			<div className="flex items-center justify-between">
				<div className="relative mx-2">
					<NavigationMenu>
						<NavigationMenuList className="">
							<NavigationMenuItem>
								<NavigationMenuTrigger className="font-poppins text-sm font-semibold text-blue hover:bg-transparent hover:text-blue">
									Categories
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<NavigationMenuLink>
										<div className="p-4 border-none bg-transparent w-96">
											<h6 className="font-poppins text-sm font-bold mb-2">
												Popular Categories
											</h6>
											<ul className="w-full font-semibold">
												<hr className="mb-4" />
												<li className="flex">
													<img className="w-24" src={laptop} alt="" />
													<Link className="bg-gray-200 p-2 ml-2 w-full" to="/">
														Laptops and computer components
													</Link>
												</li>
												<li className="flex mt-2">
													<img className="w-24" src={phone} alt="" />
													<Link className="bg-gray-200 p-2 ml-2 w-full" to="/">
														Smartpones and accesories
													</Link>
												</li>
												<li className="flex mt-2">
													<img className="w-24" src={watch} alt="" />
													<Link className="bg-gray-200 p-2 ml-2 w-full" to="/">
														Wearable tech
													</Link>
												</li>
											</ul>
										</div>
									</NavigationMenuLink>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="font-poppins text-sm font-semibold text-blue ">
					<ul className="flex items-center justify-between">
						<li>
							<Link to="/">Deals</Link>
						</li>
						<li className="mx-6">
							<Link to="/">What's new</Link>
						</li>
						<li>
							<Link to="/">Delivery</Link>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<form className="relative">
					<input
						type="text"
						placeholder="search.."
						className="bg-gray-100 px-4 py-1 rounded-3xl pr-8 w-72 focus:outline-none"
					/>
					<HiMagnifyingGlass className="absolute top-2 right-3" />
				</form>
			</div>
			<div className="flex items-center justify-between">
				<Link to="/" className="flex items-center mr-4">
					<MdPersonPin className="w-18 text-3xl text-blue" />
					<p className="font-poppins text-black text-sm font-semibold">
						Account
					</p>
				</Link>
				<Link to="/" className="flex items-center">
					<TbShoppingCartPlus className="w-18 text-2xl text-blue" />
					<p className="font-poppins text-black text-sm font-semibold">Cart</p>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
