import { Link } from "react-router-dom";
import laptopImg from "@/assets/images/laptop2.jpg";
import PhoneImg from "@/assets/images/smartphone.jpg";
import watchImg from "@/assets/images/smartwatch.jpg";
import headsetImg from "@/assets/images/headset.jpg";
import playImg from "@/assets/images/ps5.jpg";

const ProductCategoryUI = () => {
	return (
		<div className="grid grid-cols-3 gap-4 my-16">
			<div className="relative col-span-2 h-[300px] w-full">
				<img
					src={PhoneImg}
					alt="phone-image"
					className="w-full h-full object-cover"
				/>
				<div className="absolute w-full h-full top-0 left-0">
					<div className="absolute bottom-0 p-8 text-white font-poppins font-medium">
						<h6>Smart Phone</h6>
						<Link
							to="/"
							className="text-sm duration-300 ease-in-out hover:underline hover:cursor-pointer"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
			<div className="relative h-[300px] w-full">
				<img src={laptopImg} alt="laptop-image" className="w-full h-full" />
				<div className="absolute w-full h-full top-0 left-0">
					<div className="absolute bottom-0 p-8 text-white font-poppins font-medium">
						<h6>Laptops</h6>
						<Link
							to="/"
							className="text-sm duration-300 ease-in-out hover:underline hover:cursor-pointer"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
			<div className="relative h-[300px] w-full">
				<img
					src={watchImg}
					alt="watch-image"
					className="w-full h-full object-cover"
				/>
				<div className="absolute w-full h-full top-0 left-0">
					<div className="absolute bottom-0 p-8 text-white font-poppins font-medium">
						<h6>Smart Watch</h6>
						<Link
							to="/"
							className="text-sm duration-300 ease-in-out hover:underline hover:cursor-pointer"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
			<div className="relative h-[300px] w-full">
				<img
					src={headsetImg}
					alt="headset-image"
					className="w-full h-full object-cover"
				/>
				<div className="absolute w-full h-full top-0 left-0">
					<div className="absolute bottom-0 p-8 text-white font-poppins font-medium">
						<h6>Ear Phones</h6>
						<Link
							to="/"
							className="text-sm duration-300 ease-in-out hover:underline hover:cursor-pointer"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
			<div className="relative h-[300px] w-full">
				<img
					src={playImg}
					alt="ps5-image"
					className="w-full h-full object-cover"
				/>
				<div className="absolute w-full h-full top-0 left-0">
					<div className="absolute bottom-0 p-8 text-white font-poppins font-medium">
						<h6>Play Stations</h6>
						<Link
							to="/"
							className="text-sm duration-300 ease-in-out hover:underline hover:cursor-pointer"
						>
							Shop Now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCategoryUI;
