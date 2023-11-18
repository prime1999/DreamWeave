import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductType } from "@/DataTypes/ProductType";
import ProductCard from "./ProductCard";

interface ProductSliderProps {
	products: ProductType[];
}

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
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</Slider>
			</div>
		</>
	);
};

export default ProductsSlider;
