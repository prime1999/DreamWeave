import Navbar from "../../layouts/Navbar";

const Hero = () => {
	return (
		<div className="w-full h-[600px] bg-black">
			<Navbar />
			<div className="">
				<div className="w-full h-full flex items-center justify-center">
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-2xl uppercase text-center text-white font-poppins font-bold md:text-4xl">
							Epic Tech Journeys Begin Here.
						</h1>
						<button className="py-2 mt-8 px-4 font-poppins text-center text-black text-lg font-bold duration-500 bg-gradient-to-r from-blue to-other rounded-md hover:bg-gradient-to-r hover:from-other hover:to-blue">
							Start Shopping
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
