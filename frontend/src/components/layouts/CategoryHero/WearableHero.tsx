import smartWatch from "@/assets/images/smartwatch.jpg";

const WearableHero = () => {
	return (
		<div
			className="w-full relative h-[500px]"
			style={{ backgroundImage: `url(${smartWatch})`, backgroundSize: "cover" }}
		>
			<div
				className="w-full absolute top-0 left-0 h-full"
				style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
			>
				<div className="w-11/12 mx-auto h-full flex justify-start">
					<div className="w-[500px] flex flex-col justify-center items-start">
						<h1 className="text-md leading-loose text-left text-white font-bold md:text-2xl">
							Timeless Elegance, Captured in Every Tick. Discover Our Exquisite
							Collection of Watches – Where Style Meets Precision.
						</h1>
						<button className="py-2 mt-4 px-4 font-poppins text-center text-lg font-bold duration-500 bg-gradient-to-r from-blue to-other rounded-md hover:bg-gradient-to-r hover:from-other hover:to-blue">
							Start Shopping
						</button>
					</div>
				</div>
			</div>
			dv
		</div>
	);
};

export default WearableHero;
