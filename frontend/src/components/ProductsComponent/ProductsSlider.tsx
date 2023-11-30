import { Suspense, lazy } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductType } from "@/DataTypes/ProductType";
// import ProductCard from "./ProductCard";
import CardSkeleton from "../miscelleneous/CardSkeleton";

interface ProductSliderProps {
	products: ProductType[];
}

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const ProductsSlider: React.FC<ProductSliderProps> = ({ products }) => {
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};
	return (
		<>
			<div>
				<Slider {...settings}>
					{products?.map((product) => (
						<Suspense key={product._id} fallback={<CardSkeleton />}>
							<Suspense key={product._id} fallback={<CardSkeleton />}>
								<ProductCard product={product} />
							</Suspense>
						</Suspense>
					))}
				</Slider>
			</div>
		</>
	);
};

export default ProductsSlider;
