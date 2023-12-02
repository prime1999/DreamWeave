import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { toast } from "react-toastify";
import image from "@/assets/images/Filing system-amico.png";
import logo from "@/assets/images/logo.png";
import { useRegisterUserMutation } from "@/slices/UserSlice";
import { setCredentials } from "@/slices/AuthSlice";

const RegisterPage = () => {
	// define the type of data that will be in the formData
	type formData = {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};
	// init the useNavigae hook
	const navigate = useNavigate();
	// get the search param from the current location
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	// get the value of the redirect key, if there is none then using the / for the homepage
	const redirect = sp.get("redirect") || "/";
	// get the user's info from the redux store named auth
	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		// check if there is a userInfo in te redux state
		if (userInfo) {
			// if there is one then the user is logged in, redirect the user to there wanted destination
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	// state to hide and show te password been inputted
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	// state for the form data
	const [formData, setFormData] = useState<formData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	// destructure the form data keys from there object
	const { name, email, password, confirmPassword } = formData;
	// get the register function as well as the isLaoding boolen from the userApiSlice
	const [register, { isLoading }] = useRegisterUserMutation();
	// init the useDispatch hook
	const dispatch = useDispatch();
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
		if (
			password !== confirmPassword ||
			!password ||
			!name ||
			!email ||
			!emailRegex.test(email)
		) {
			// throw an error if they don't
			toast.error("try again", {
				className: "bg-red-200",
				bodyClassName: "text-light",
				progressClassName: "bg-transparent",
			});
		} else {
			// if they do, then:
			// send the form data to the backend and get the response.
			const res = await register({ name, email, password }).unwrap();
			// save the response to local storage and redux auth store
			dispatch(setCredentials({ ...res }));
			// navigate to the redirect
			navigate(redirect);
			// show a success message
			toast.success("welcome to DreamWeave", {
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
					<h3 className="font-poppins text-xl">Create Account</h3>
					<p className="text-blue font-cour text-sm">
						Join us and start shopping for the best
					</p>
					<form onSubmit={handleRegister} className="w-full mt-4 text-black">
						<div className="relative">
							<input
								type="text"
								placeholder="Your Name"
								id="name"
								value={name}
								onChange={(e) => handleChange(e)}
								className="bg-light rounded-3xl px-4 py-2 w-full focus:outline-none"
							/>
							<span className="absolute top-3 right-3 text-blue">
								<BsPersonFill />
							</span>
						</div>
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
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Confirm Password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => handleChange(e)}
								className="bg-light rounded-3xl px-4 py-2 w-full focus:outline-none"
							/>
							<span
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute top-3 right-4 text-blue hover:cursor-pointer"
							>
								{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
							{isLoading && <span className="btnLoader"></span>}Sign Up
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
						<div className="mt-4 text-center">
							<h6>
								Already have an account?{" "}
								<span>
									<Link
										to={redirect ? `/logIn?redirect=${redirect}` : "/logIn"}
										className="text-blue font-bold"
									>
										Sign In
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

export default RegisterPage;
