import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import {
	MdPersonPin,
	MdOutlineDiscount,
	MdLogout,
	MdLogin,
	MdCreate,
	MdDashboard,
} from "react-icons/md";
import { FaQuestion, FaTruckFast } from "react-icons/fa6";
import { TbShoppingCartPlus } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import laptop from "../../assets/images/d1.jpg";
import phone from "../../assets/images/d2.jpg";
import watch from "../../assets/images/d9.webp";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchModal from "./SearchModal";
import { useLogUserOutMutation } from "@/slices/UserSlice";
import { logOut } from "@/slices/AuthSlice";
const NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (!userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);
	console.log(userInfo);

	const [logOutApiCall] = useLogUserOutMutation() as any;
	const { cartItems } = useSelector((state) => (state as any).cart);

	// function to log a user out
	const logOutUser = async () => {
		//  ake a try-catch block
		try {
			// await on the function to log a user out
			await logOutApiCall({ cartItems }).unwrap();
			// dispatch thee log out funtion t clear the local storage
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
		<div className="w-11/12 mx-auto flex items-center justify-between">
			<Link to="/" className="flex items-center py-4 font-poppins">
				<img className="w-12" src={logo} alt="logo" />
				<h1 className="font-kenia text-xl ml-1 text-black">DREAMWEAVE</h1>
			</Link>
			<div>
				<Sheet>
					<SheetTrigger>
						<IoIosMenu className="text-xl" />
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>
								<Link to="/" className="flex items-center py-4 font-poppins">
									<img className="w-12" src={logo} alt="logo" />
									<h1 className="font-kenia text-xl ml-1 text-black">
										DREAMWEAVE
									</h1>
								</Link>
							</SheetTitle>
							<SheetDescription>
								<>
									<DropdownMenu>
										<DropdownMenuTrigger className="flex">
											<span className="flex items-center p-2 w-60 rounded-2xl hover:bg-light">
												<p className="font-poppins flex items-center justify-center font-semibold duration-500 hover:text-blue">
													<BiCategoryAlt className="mr-4" />
													Categories{" "}
												</p>
												<span className="ml-2">
													<IoIosArrowDown />
												</span>
											</span>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Popular Categories</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<div className="w-[250px]">
													<ul className="w-full font-semibold">
														<hr className="mb-4" />
														<li className="flex">
															<img className="w-12" src={laptop} alt="" />
															<Link
																className="bg-gray-200 p-2 ml-2 w-full"
																to="/category/laptops and computer components"
															>
																Laptops and computers
															</Link>
														</li>
														<li className="flex mt-2">
															<img className="w-12" src={phone} alt="" />
															<Link
																className="bg-gray-200 p-2 ml-2 w-full"
																to="/category/smartphones and accessories"
															>
																Smartpones and accesories
															</Link>
														</li>
														<li className="flex mt-2">
															<img className="w-12" src={watch} alt="" />
															<Link
																className="bg-gray-200 p-2 ml-2 w-full"
																to="/category/wearable tech"
															>
																Wearable tech
															</Link>
														</li>
													</ul>
												</div>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</>
								<Link
									className="flex items-center p-2 w-60 rounded-2xl mt-4 font-poppins font-semibold duration-500 hover:text-blue hover:bg-light"
									to="/"
								>
									<MdOutlineDiscount className="mr-4" /> Deals
								</Link>
								<Link
									className="flex items-center p-2 w-60 rounded-2xl my-4 font-poppins font-semibold duration-500 hover:text-blue hover:bg-light"
									to="/"
								>
									<FaQuestion className="mr-4" />
									What's new
								</Link>
								<Link
									className="flex items-center p-2 w-60 rounded-2xl font-poppins font-semibold duration-500 hover:text-blue hover:bg-light"
									to="/"
								>
									<FaTruckFast className="mr-4" />
									Delivery
								</Link>
								<div className="flex flex-col mt-4">
									{/* show user profile link if user is logged in */}
									{userInfo ? (
										<DropdownMenu>
											<DropdownMenuTrigger className="flex items-center">
												<MdPersonPin className="w-18 text-3xl text-blue" />
												<p className="font-poppins text-black text-sm font-semibold">
													Account
												</p>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem>
													<Link
														to="/account"
														className="flex font-cour hover:cursor-pointer"
													>
														<BsFillPersonLinesFill className="mr-2" />
														Profile
													</Link>
												</DropdownMenuItem>
												{userInfo && userInfo.isAdmin && (
													<DropdownMenuItem>
														<Link
															to="/admin/dashboard/sales"
															className="flex font-cour hover:cursor-pointer"
														>
															<MdDashboard className="mr-2" />
															Dashboard
														</Link>
													</DropdownMenuItem>
												)}
												<DropdownMenuItem
													onClick={logOutUser}
													className="font-cour hover:cursor-pointer"
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
												<p className="font-poppins text-black text-sm font-semibold">
													Account
												</p>
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuItem className="font-cour">
													<Link to="/register" className="flex items-center">
														<MdCreate className="mr-2" />
														Sign-Up
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem className="font-cour">
													<Link to="/logIn" className="flex items-center">
														<MdLogin className="mr-2" />
														Sign-In
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									)}
									{/* ends here */}
									<Link to="/cart" className="flex items-end mt-8">
										<div className="relative">
											<TbShoppingCartPlus className="w-18 text-2xl text-blue" />
											{cartItems.length > 0 && (
												<p className="absolute -top-4 -right-3 w-2 h-2 text-sm text-light font-semibold flex justify-center items-center p-3 rounded-[100%] bg-blue border-2 border-white">
													{cartItems.length}
												</p>
											)}
										</div>
										<p className="font-poppins text-black text-sm font-semibold z-50">
											Cart
										</p>
									</Link>
								</div>
								<hr />
								<SearchModal>
									<button className="bg-blue py-2 px-8 w-full rounded-lg mt-4 font-poppins text-bold text-white">
										Search Products
									</button>
								</SearchModal>
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};

export default NavBar;
