import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import image from "@/assets/images/Mobile login-amico.png";
import logo from "@/assets/images/logo.png";

const AuthPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
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
					<form className="w-full mt-4 text-black">
						<div className="relative">
							<input
								type="email"
								placeholder="Your Email"
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
								className="bg-light rounded-3xl px-4 py-2 mb-4 w-full focus:outline-none"
							/>
							<span
								onClick={() => setShowPassword(!showPassword)}
								className="absolute top-3 right-4 text-blue hover:cursor-pointer"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>
						<button className="w-full text-center py-2 mt-4 text-light font-poppins font-semibold bg-blue rounded-full duration-500 hover:shadow-md hover:shadow-blue">
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
									<Link to="/logIn" className="text-blue font-bold">
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
