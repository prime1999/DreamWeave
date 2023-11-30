import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import image from "@/assets/images/Successful purchase-bro.png";

const RegisterPage = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex justify-between items-center">
				<div className="w-96">
					<img src={image} alt="" />
				</div>
				<div className="shadow-md p-4 rounded-lg w-[350px]">
					<h3 className="font-poppins text-2xl">Create Account</h3>
					<p className="text-black font-poppins text-sm">
						Join us and start shopping for the best
					</p>
					<form className="w-full mt-4">
						<div>
							<input
								type="text"
								placeholder="Your Name"
								className="bg-light rounded-3xl px-4 py-2 w-full focus:outline-none"
							/>
						</div>
						<div>
							<input
								type="email"
								placeholder="Your Email"
								className="bg-light rounded-3xl px-4 py-2 my-4 w-full focus:outline-none"
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Enter password"
								className="bg-light rounded-3xl px-4 py-2 mb-4 w-full focus:outline-none"
							/>
						</div>
						<div>
							<input
								type="password"
								placeholder="Confirm Password"
								className="bg-light rounded-3xl px-4 py-2 w-full focus:outline-none"
							/>
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
						<div className="mt-8 text-center">
							<h6>
								Already have an account?{" "}
								<span>
									<Link to="/logIn" className="text-blue font-bold">
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
