import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiHome, CiDeliveryTruck, CiShoppingCart } from "react-icons/ci";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
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
				<Link
					to="/"
					className="flex flex-col gap-2 items-center font-poppins group"
				>
					<MdPerson className="text-3xl text-white duration-300 ease-in-out group-hover:text-blue" />
					<p className="text-sm text-light font-medium duration-300 ease-in-out group-hover:text-blue">
						Account
					</p>
				</Link>
			</div>
			<div></div>
		</div>
	);
};

export default NavBar;
