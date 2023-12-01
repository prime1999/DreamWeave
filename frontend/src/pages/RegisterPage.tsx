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
	type formData = {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};
	const navigate = useNavigate();
	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [formData, setFormData] = useState<formData>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { name, email, password, confirmPassword } = formData;

	const [register, { isLoading }] = useRegisterUserMutation();

	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (
			password !== confirmPassword ||
			!password ||
			!name ||
			!email ||
			!emailRegex.test(email)
		) {
			toast.error("try again", {
				className: "bg-red-200",
				bodyClassName: "text-light",
				progressClassName: "bg-transparent",
			});
		} else {
			const res = await register({ name, email, password }).unwrap();
			dispatch(setCredentials({ ...res }));
			navigate(redirect);
			toast.success("welcome to DreamWeave", {
				className: "bg-green-200",
				bodyClassName: "text-light",
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
						<button className="w-full text-center py-2 mt-4 text-light font-poppins font-semibold bg-blue rounded-full duration-500 hover:shadow-md hover:shadow-blue">
							Sign Up
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
