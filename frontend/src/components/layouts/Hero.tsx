import hero from "../../assets/images/hero2.jpg";

const Hero = () => {
	return (
		<div
			className="w-full relative h-[500px]"
			style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover" }}
		>
			<div
				className="w-full absolute top-0 left-0 h-full"
				style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
			>
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
