import laptop from "@/assets/images/laptop.jpg";

const LaptopHero = () => {
	return (
		<div
			className="w-full relative h-[500px]"
			style={{ backgroundImage: `url(${laptop})`, backgroundSize: "cover" }}
		>
			<div
				className="w-full absolute top-0 left-0 h-full"
				style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
			>
				<div className="w-full h-full flex items-center justify-center">
					<div className="w-[400px] mx-auto flex flex-col justify-center items-center md:w-7/12">
						<h1 className="text-md leading-loose text-center text-light font-bold md:text-xl">
							Powerful performance, stylish design – our laptops redefine
							productivity. Experience efficiency and elegance in every click.
							Elevate your digital workspace effortlessly.
						</h1>
						<button className="py-2 mt-4 px-4 font-poppins text-center text-lg font-bold duration-500 bg-gradient-to-r from-blue to-other rounded-md hover:bg-gradient-to-r hover:from-other hover:to-blue">
							Start Shopping
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LaptopHero;
