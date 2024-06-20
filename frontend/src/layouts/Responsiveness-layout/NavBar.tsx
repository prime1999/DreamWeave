import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiHome, CiDeliveryTruck, CiShoppingCart } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdPersonPin, MdLogout, MdPerson, MdDashboard } from "react-icons/md";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchModal from "./SearchModal";
import { useLogUserOutMutation } from "@/slices/UserSlice";
import { logOut } from "@/slices/AuthSlice";

const NavBar = () => {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [prevScrollPS, setPrevScrollPS] = useState<number>(0);
	// init the dispatch and navigate hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// get the user details from the redux store
	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPS = window.scrollY;
			if (prevScrollPS > currentScrollPS || currentScrollPS < 10) {
				setIsVisible(true);
				setPrevScrollPS(currentScrollPS);
			} else {
				setIsVisible(false);
				setPrevScrollPS(currentScrollPS);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPS]);

	// useEffect(() => {
	// 	if (!userInfo) {
	// 		navigate("/");
	// 	}
	// }, [navigate, userInfo]);

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
		<div
			className={`${
				isVisible ? "flex" : "hidden"
			} fixed bottom-0 left-0 w-full py-4 px-4 duration-300 ease-in-out z-50 bg-navDark lg:hidden`}
		>
			<div className="w-full flex items-center justify-between">
				<Link
					to="/"
					className="flex flex-col gap-2 items-center font-poppins group"
				>
					<CiHome className="text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
					<p className="text-sm text-light font-medium duration-300 ease-in-out group-hover:text-blue">
						Home
					</p>
				</Link>
				<Link
					to="/"
					className="flex flex-col gap-2 items-center font-poppins group"
				>
					<CiDeliveryTruck className="text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
					<p className="text-sm text-light font-medium duration-300 ease-in-out group-hover:text-blue">
						Delivery
					</p>
				</Link>
				<button className="flex flex-col gap-2 items-center font-poppins">
					<SearchModal>
						<FaMagnifyingGlass className="text-3xl text-white w-18 duration-300 ease-in-out hover:text-blue" />
					</SearchModal>
				</button>
				<Link
					to="/"
					className="flex flex-col gap-2 items-center font-poppins group"
				>
					<CiShoppingCart className="text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
					<p className="text-sm text-light font-medium duration-300 ease-in-out group-hover:text-blue">
						Cart
					</p>
				</Link>
				{userInfo ? (
					<DropdownMenu>
						<DropdownMenuTrigger className="flex flex-col gap-2 items-center group">
							<MdPersonPin className="w-18 text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
							<p className="font-poppins text-white text-xs font-medium duration-300 ease-in-out group-hover:text-blue">
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
					<Link
						to="/logIn"
						className="flex flex-col gap-2 items-center font-poppins group"
					>
						<MdPerson className="text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
						<p className="text-sm text-light font-medium duration-300 ease-in-out group-hover:text-blue">
							Sign In
						</p>
					</Link>
				)}
			</div>
			<div></div>
		</div>
	);
};

export default NavBar;
