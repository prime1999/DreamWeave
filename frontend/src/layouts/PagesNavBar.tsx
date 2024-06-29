import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {
	MdPersonPin,
	MdLogout,
	MdLogin,
	MdCreate,
	MdDashboard,
} from "react-icons/md";
import logo from "../assets/images/logo.png";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogUserOutMutation } from "@/slices/UserSlice";
import { logOut } from "@/slices/AuthSlice";

import NavBar from "./Responsiveness-layout/NavBar";
const PagesNavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state: any) => state.cart);
	const { userInfo } = useSelector((state: any) => state.auth);

	// useEffect(() => {
	// 	if (!userInfo) {
	// 		navigate("/");
	// 	}
	// }, [navigate, userInfo]);

	const [logOutApiCall] = useLogUserOutMutation() as any;

	// function to log a user out
	const logOutUser = async () => {
		//  make a try-catch block
		try {
			// await on the function to log a user out
			await logOutApiCall({ cartItems }).unwrap();
			// dispatch thee log out funtion to clear the local storage
			dispatch(logOut());
			navigate("/");
			toast.success("User logged out", {
				className: "bg-white",
				bodyClassName: "text-black font-poppins font-semibold",
				progressClassName: "bg-transparent",
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="border-b border-gray-400 mx-auto w-11/12 py-4 hidden lg:flex">
			<div className="w-full mx-auto hidden items-center justify-between lg:flex lg:w-full xl:w-11/12">
				<Link to="/" className="flex items-end font-poppins">
					<img className="w-12 mt-1" src={logo} alt="logo" />
					<h1 className="font-kenia text-xl ml-1 text-black">REAMWEAVE</h1>
				</Link>
				<div className="flex items-center justify-between">
					<div className="relative mx-2">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="font-poppins text-xs font-semibold text-black hover:bg-transparent hover:text-gray-600">
										Categories
									</NavigationMenuTrigger>
									<NavigationMenuContent className="border-darkBorder bg-black">
										<NavigationMenuLink>
											<div className="p-4 border-none bg-transparent w-96">
												<h6 className="font-poppins text-sm font-semibold text-white mb-2">
													Popular Categories
												</h6>
												<ul className="w-full font-semibold">
													<hr className="mb-4 border-darkBorder" />
													<li className="flex">
														<img className="w-24" src={laptop} alt="" />
														<Link
															className="bg-gray-200 p-2 ml-2 w-full"
															to="/category/laptops and computer components"
														>
															Laptops and computer components
														</Link>
													</li>
													<li className="flex mt-2">
														<img className="w-24" src={phone} alt="" />
														<Link
															className="bg-gray-200 p-2 ml-2 w-full"
															to="/category/smartphones and accessories"
														>
															Smartphones and accesories
														</Link>
													</li>
													<li className="flex mt-2">
														<img className="w-24" src={watch} alt="" />
														<Link
															className="bg-gray-200 p-2 ml-2 w-full"
															to="/category/wearable tech"
														>
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
					<div className="font-poppins text-xs text-black font-medium ">
						<ul className="flex items-center justify-between">
							<li className="duration-400 hover:text-gray-600">
								<Link to="/deals">Deals</Link>
							</li>
							<li className="mx-6 duration-400 hover:text-gray-600">
								<Link to="/contact">Contact us</Link>
							</li>
							<li className="duration-400 hover:text-gray-600">
								<Link to="/delivery">Delivery</Link>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<form className="relative">
						<input
							type="text"
							placeholder="search.."
							className="bg-transparent px-4 py-2 rounded-3xl pr-8 w-72 text-black text-xs border border-gray-400 focus:outline-none"
						/>
						<HiMagnifyingGlass className="absolute top-2 right-3 text-darkBorder hover:cursor-pointer" />
					</form>
				</div>
				<div className="flex items-center justify-between">
					{/* show user profile link if user is logged in */}
					{userInfo ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center">
								<MdPersonPin className="w-18 text-3xl text-blue" />
								<p className="font-poppins text-black text-xs font-medium duration-600 hover:text-gray-600">
									Account
								</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="border-darkBorder bg-black">
								<DropdownMenuItem className="group">
									<Link
										to="/account"
										className="flex font-cour text-xs text-white group-hover:cursor-pointer group-hover:text-black"
									>
										<BsFillPersonLinesFill className="mr-2" />
										Profile
									</Link>
								</DropdownMenuItem>
								{userInfo && userInfo.isAdmin && (
									<DropdownMenuItem className="group">
										<Link
											to="/admin/dashboard/sales"
											className="flex font-cour text-xs text-white hover:cursor-pointer group-hover:text-black"
										>
											<MdDashboard className="mr-2" />
											Dashboard
										</Link>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									onClick={logOutUser}
									className="font-cour text-xs text-white hover:cursor-pointer group-hover:text-black"
								>
									<MdLogout className="mr-2" />
									Log Out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center">
								<MdPersonPin className="w-18 text-3xl text-blue" />
								<p className="font-poppins text-black text-xs font-medium duration-600 hover:text-gray-600">
									Account
								</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent className=" border-darkBorder bg-black">
								<DropdownMenuItem className="group">
									<Link
										to="/register"
										className="flex font-cour text-xs text-white group-hover:cursor-pointer group-hover:text-black"
									>
										<MdCreate className="mr-2" />
										Sign-Up
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="group">
									<Link
										to="/logIn"
										className="flex font-cour text-xs text-white group-hover:cursor-pointer group-hover:text-black"
									>
										<MdLogin className="mr-2" />
										Sign-In
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
					{/* ends here */}
					<Link to="/cart" className="flex items-center ml-4">
						<div className="relative">
							<TbShoppingCartPlus className="w-18 text-2xl text-blue" />
							{cartItems.length > 0 && (
								<p className="absolute -top-4 -right-3 w-2 h-2 text-sm text-light font-semibold flex justify-center items-center p-3 rounded-[100%] bg-blue border-2 border-white">
									{cartItems.length}
								</p>
							)}
						</div>
						<p className="font-poppins text-black text-xs font-medium z-50 duration-600 hover:text-gray-600">
							Cart
						</p>
					</Link>
				</div>
			</div>
			<div className="block lg:hidden">
				<NavBar />
			</div>
		</div>
	);
};

export default PagesNavBar;
