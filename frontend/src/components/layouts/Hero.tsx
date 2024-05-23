import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/layouts/Navbar";
import IPhone from "/static-images/IPhone.png";

const Hero = () => {
	useGSAP(() => {
		gsap.to("#hero-head", { x: 0, duration: 1, ease: "power2.inOut" });
		gsap.to("#hero-top-para", {
			y: 0,
			duration: 1,
			ease: "power2.inOut",
			opacity: 1,
		});
		gsap.to("#hero-btn", {
			duration: 1,
			ease: "power2.inOut",
			opacity: 1,
		});
		gsap.to("#phone", { y: 0, duration: 1, ease: "power2.inOut" });
	}, []);
	return (
		<div className="w-full h-[600px] bg-black pt-4 overflow-hidden">
			<Navbar />
			<div className="w-11/ px-8 pt-16 mx-auto flex flex-col items-center justify-between overflow-hidden md:flex-row md:h-[86%] md:pt-8">
				<div className=" flex flex-col justify-center items-start overflow-hidden md:w-[400px]">
					<p
						id="hero-top-para"
						className="translate-y-[-50px] opacity-0 text-sm border border-darkBorder rounded-full px-4 py-1 text-white"
					>
						Welcome to the Future of Tech
					</p>
					<h1
						id="hero-head"
						className="translate-x-[-100px] mt-8 mb-4 text-lg uppercase text-left text-white font-poppins font-normal tracking-wider  md:text-2xl"
					>
						{" "}
						Your Ultimate Destination for Innovation and Inspiration.
					</h1>
					<p className="text-gray-400 text-sm">
						Explore Limitless Possibilities with Our Cutting-Edge Products and
						Unrivaled Expertise.{" "}
					</p>
					<button
						id="hero-btn"
						className="opacity-0 py-2 mt-8 px-4 font-poppins text-center text-sm text-slate-300 text-md font-medium bg-navDark duration-500 rounded-full border border-darkBorder hover:bg-black"
					>
						Start Shopping
					</button>
				</div>
				<div className="w-10/12 h-full flex items-center justify-center md:w-1/2">
					<img id="phone" className="translate-y-[400px]" src={IPhone} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
