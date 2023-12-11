import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import image from "@/assets/images/Mobile login-amico.png";
import logo from "@/assets/images/logo.png";
import { useLogUserInMutation } from "@/slices/UserSlice";
import { clearUserInfoCart, setCredentials } from "@/slices/AuthSlice";
import { useAddToCartMutation } from "@/slices/CartApiSlice";
import { addToCart } from "@/slices/CartSlice";

const AuthPage: React.FC = () => {
	// define the type of data that will be in the formData
	type formData = {
		email: string;
		password: string;
	};
	// init the useNavigae hook
	const navigate = useNavigate();
	// init the useDispatch hook
	const dispatch = useDispatch();
	// get the search param from the current location
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	// get the value of the redirect key, if there is none then using the / for the homepage
	const redirect = sp.get("redirect") || "/";
	// get the user's info from the redux store named auth
	const { userInfo } = useSelector((state: any) => state.auth);
	const { cartItems } = useSelector((state: any) => state.cart);
	const [logIn, { isLoading }] = useLogUserInMutation();
	const [addProductToCart, { isLoading: addingToCart }] = useAddToCartMutation(
		{}
	);

	useEffect(() => {
		// check if there is a userInfo in te redux state
		if (userInfo) {
			// check if the userinfo is still loading
			if (isLoading) {
				console.log("loading...");
			}

			// navigate to the initial location the user wants to go
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo, cartItems, dispatch, isLoading]);
	// state to hide and show te password been inputted
	const [showPassword, setShowPassword] = useState<boolean>(false);

	// state for the form data
	const [formData, setFormData] = useState<formData>({
		email: "",
		password: "",
	});
	// destructure the form data keys from there object
	const { email, password } = formData;
	// function to handle the change event on te input in the form
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// set the input fields to the value that is been inputted
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to handle the submit event
	const handleRegister = async (e: React.FormEvent) => {
		// prevent the default action of the form
		e.preventDefault();

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		// chek if the fields meet all required parameters
		if (!password || !email || !emailRegex.test(email)) {
			// throw an error if they don't
			toast.error("try again", {
				className: "bg-red-200",
				bodyClassName: "text-light",
				progressClassName: "bg-transparent",
			});
		} else {
			// if they do, then:
			// send the form data to the backend and get the response.
			const res = await logIn({ email, password }).unwrap();
			// save the response to local storage and redux auth store
			dispatch(setCredentials({ ...res }));
			console.log(res);
			// if there was an item in the cart before te user logged in then,
			if (cartItems) {
				// iterate through the cart and send them to the user cart collection in te DB
				cartItems.forEach((item: any) =>
					addProductToCart({ product: item._id, quantity: item.qty })
				);
			}
			if (res.cart) {
				// if there is a cart object in the userInfo object
				const { cartItems } = res.cart as any;
				// iterate through each items in the cart and add them to the cart in the local storage and redux store
				cartItems?.forEach((item: any) => dispatch(addToCart(item)));
				// after all this is done, clear the cart in the userInfo
				dispatch(clearUserInfoCart());
			}
			// show a success message
			toast.success("welcome back", {
				className: "bg-green-200",
				bodyClassName: "text-black font-poppins font-semibold",
				progressClassName: "bg-transparent",
			});
		}
	};
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex justify-between items-center">
				<div className="hidden w-96 md:block">
					<img src={image} alt="" />
				</div>
				<div className="shadow-md p-4 rounded-lg w-[350px]">
					<Link
						to="/"
						className="flex items-center justify-center py-4 font-poppins mx-auto"
					>
						<img className="w-12" src={logo} alt="logo" />
						<h1 className="font-kenia text-xl ml-1 text-black">DREAMWEAVE</h1>
					</Link>
					<h3 className="font-poppins text-xl">Welcome back</h3>
					<p className="text-blue font-cour text-sm">
						Get back to your shopping
					</p>
					<form onSubmit={handleRegister} className="w-full mt-4 text-black">
						<div className="relative">
							<input
								type="text"
								placeholder="Your Email"
								id="email"
								value={email}
								onChange={(e) => handleChange(e)}
								className="bg-light rounded-3xl px-4 py-2 pr-8 my-4 w-full focus:outline-none"
							/>
							<span className="absolute top-7 right-3 text-blue">
								<MdEmail />
							</span>
						</div>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter password"
								id="password"
								value={password}
								onChange={(e) => handleChange(e)}
								className="bg-light rounded-3xl px-4 py-2 mb-4 w-full focus:outline-none"
							/>
							<span
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-3 right-4 text-blue hover:cursor-pointer"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
						<button
							disabled={isLoading}
							className={`flex items-center justify-center w-full text-center py-2 mt-4 text-light font-poppins font-semibold ${
								isLoading
									? "bg-other hover:shadow-none"
									: "bg-blue hover:shadow-blue"
							} rounded-full duration-500 hover:shadow-md`}
						>
							{isLoading && <span className="btnLoader"></span>}
							Sign In
						</button>
						<div className="flex items-center justify-between mt-4">
							<hr className="w-36" />
							<p>or</p>
							<hr className="w-36" />
						</div>
						<div className="flex justify-center text-white text-lg mt-4">
							<button className="rounded-[100%] p-4 bg-red-500 duration-500 hover:shadow-md hover:shadow-red-500">
								<FaGoogle />
							</button>
						</div>
						<div className="mt-8 text-center">
							<h6>
								Don't have an account?{" "}
								<span>
									<Link
										to={
											redirect ? `/register?redirect=${redirect}` : "/register"
										}
										className="text-blue font-bold"
									>
										register here
									</Link>
								</span>
							</h6>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
