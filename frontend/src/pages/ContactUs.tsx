import { FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import SignUpBg from "@/assets/images/signUp.jpg";
import PagesNavBar from "@/layouts/PagesNavBar";

const ContactUs = () => {
	return (
		<>
			<PagesNavBar />
			<div className="w-full h-screen flex items-center justify-center">
				<div className="w-8/12 flex items-center justify-between gap-4">
					<div>
						<h4 className="flex flex-col justify-start items-start gap-2">
							<hr className="w-12 border-blue" />
							<span className="text-xs font-poppins leading-loose text-blue font-semibold">
								YOUR ULTIMATE DESTINATION FOR INNOVATION AND INSPIRATION.
							</span>
						</h4>
						<h1 className="font-cour text-4xl mt-4">Contact Us</h1>
						<p className="mt-4 font-poppins text-sm font-medium">Dream-weave</p>
						<div className="w-full">
							<h5 className="flex items-center gap-2 text-blue mt-4">
								<FaEnvelope />
								<span className="font-poppins font-medium">
									info@dreamweave.org
								</span>
							</h5>
							<h5 className="flex items-center gap-2 text-blue mt-4">
								<BsFillTelephoneFill />{" "}
								<span className="font-poppins font-medium">
									234-706-828-0718
								</span>
							</h5>
							<div className="grid grid-cols-2 mt-8 gap-6">
								<div className="font-poppins text-sm gap-2">
									<h3 className="font-semibold">Yakubu Moshood</h3>
									<p className="font-medium my-2">Founder/CEO Dreamweave</p>
									<p className="font-cour text-sm underline text-blue">
										moshoodolabanji22@gmail.com
									</p>
								</div>
								<div className="font-poppins text-sm gap-2">
									<h3 className="font-semibold">Yakubu Moshood</h3>
									<p className="font-medium my-2">Founder/CEO Dreamweave</p>
									<p className="font-cour text-sm underline text-blue">
										moshoodolabanji22@gmail.com
									</p>
								</div>
								<div className="font-poppins text-sm gap-2">
									<h3 className="font-semibold">Yakubu Moshood</h3>
									<p className="font-medium my-2">Founder/CEO Dreamweave</p>
									<p className="font-cour text-sm underline text-blue">
										moshoodolabanji22@gmail.com
									</p>
								</div>
								<div className="font-poppins text-sm gap-2">
									<h3 className="font-semibold">Yakubu Moshood</h3>
									<p className="font-medium my-2">Founder/CEO Dreamweave</p>
									<p className="font-cour text-sm underline text-blue">
										moshoodolabanji22@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>

					<form
						className="w-[450px] flex flex-col p-4"
						style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
					>
						<div className="flex items-center justify-center gap-2 my-4">
							<div>
								<label className="font-poppins font-medium text-sm text-blue mb-4">
									First-Name *
								</label>
								<input
									type="text"
									placeholder="First-Name"
									className="p-2 h-8"
									style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
								/>
							</div>
							<div>
								<label className="font-poppins font-medium text-sm text-blue mb-4">
									Last-Name *
								</label>
								<input
									type="text"
									placeholder="Last-Name"
									className="p-2 h-8"
									style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
								/>
							</div>
						</div>
						<label className="font-poppins font-medium text-sm text-blue">
							Email *
						</label>
						<input
							type="email"
							placeholder="Email"
							className="p-2 h-8 mb-4"
							style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
						/>
						<label className="font-poppins font-medium text-sm mb-2 text-blue">
							Message *
						</label>
						<textarea
							placeholder="Message"
							className="p-2 h-36 mb-4"
							style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
						></textarea>
						<div className="flex justify-end">
							<button className="w-24 items-end bg-blue p-2 font-poppins font-medium cursor-pointer text-white rounded-md">
								Send
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
