import { useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetHighlyRatedProductsQuery } from "@/slices/ProductSlice";

const TopRatedSlider = () => {
	const [productId, setProductId] = useState<number>(0);
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

	const handleMove = (i: number) => {
		setProductId(i);
		gsap.to("#divSlider", {
			transform:
				window.innerWidth < 760
					? `translateX(${-105 * i}%)` // mobile
					: window.innerWidth < 1200
					? `translateX(${-102 * i}%)` // tablet
					: `translateX(${-100 * i}%)`, // laptop
			duration: 1,
			ease: "power2.inOut",
		});
		console.log({ productId, index: i });
	};
	return (
		<div className="relative mb-32 lg:hidden">
			<div className="w-full mx-auto flex items-center justify-between gap-4 overflow-x-auto my-12 no-scrollbar relative md:gap-12">
				{products?.map(
					(product, index) =>
						index <= 4 && (
							<Link
								key={index}
								id="divSlider"
								to={`/product/${product._id}`}
								className="w-96 h-48 flex flex-col items-center justify-center"
							>
								<div className="w-36 h-36 bg-gray-300 rounded-[100%] flex items-center justify-center">
									<img
										className="w-full h-24 object-scale-down"
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div>
									<h4 className="font-poppins text-sm mt-2 font-medium">
										{product.name}
									</h4>
									<p className="text-center text-sm font-medium text-gray-500">
										{product.countInStock} Items
									</p>
								</div>
							</Link>
						)
				)}
			</div>
			<div className="w-full absolute -bottom-13 flex justify-center items-center text-black gap-4 text-2xl font-semibold">
				<button
					disabled={productId === 0}
					onClick={() => handleMove(productId - 1)}
					className={`bg-gray p-2 shadow-md rounded-full text-center cursor-pointer ${
						productId === 0 && "opacity-[0.5] pointer-events-none"
					}`}
				>
					<IoIosArrowBack className="cursor-pointer" />
				</button>
				<button
					disabled={productId === 4}
					onClick={() => handleMove(productId + 1)}
					className={`bg-gray p-2 shadow-md rounded-full text-center cursor-pointer ${
						productId === 4 && "opacity-[0.5] pointer-events-none"
					}`}
				>
					<IoIosArrowForward />
				</button>
			</div>
		</div>
	);
};

export default TopRatedSlider;
