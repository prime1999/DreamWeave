import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import {
	useGetHighlyRatedProductsQuery,
	useGetProductsQuery,
} from "@/slices/ProductSlice";
import Paginate from "@/components/Paginate";
import ProductsSlider from "@/components/ProductsComponent/ProductsSlider";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";
import TopRated from "@/layouts/TopRated";
import ProductCategoryUI from "@/components/ProductCategoryUI";
import HomePageSkeleton from "@/components/miscelleneous/HomePageSkeleton";
import mobileVideo from "@/assets/videos/0418.mp4";
import { Link } from "react-router-dom";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

//register the scroll trigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
	const [lenovoProduct, setLenovoProduct] = useState<any>(null);
	const [videoComplete, setVideoComplete] = useState<boolean>(false);
	const [video, setVideo] = useState({
		startPlay: false,
		isPlaying: false,
	});
	const videoRef = useRef<any>(null);
	const [productsData, setProductsData] = useState<any>([]);

	// const { pageNumber } = useParams();
	const [pageNumber, setPageNumber] = useState<number>(1);
	const { data, isLoading: loadingProducts } = useGetProductsQuery({
		pageNumber,
	});
	const { data: products } = useGetHighlyRatedProductsQuery({} as any);

	const { cartItems } = useSelector((state: any) => state.cart);

	useEffect(() => {
		setProductsData(data?.products);
		// for the mobile video link
		// get the Lenovo ThinkPad X1 Carbon to use its id
		const singleProduct = data?.products.filter(
			(product) => product.name === "Lenovo ThinkPad X1 Carbon"
		);
		if (singleProduct) {
			setLenovoProduct(singleProduct[0]);
		}
	}, [data]);

	//to make th mobile video play when in view
	useEffect(() => {
		// check if the video ref exist
		if (!videoRef.current) return;
		//the animation for the in view
		gsap.to(videoRef.current, {
			scrollTrigger: {
				trigger: videoRef.current,
				start: "top 80%",
				toggleActions: "restart none none none",
				onEnter: () => {
					setVideo((prev) => ({
						...prev,
						startPlay: true,
						isPlaying: true,
					}));

					// Optional: autoplay manually
					if (videoRef.current) {
						videoRef.current.play();
					}
				},
			},
		});

		gsap.fromTo(
			"#link",
			{ opacity: 0, y: -50 },
			{
				opacity: 1,
				y: 0,
				duration: 1,
				ease: "power1.inOut",
			}
		);
		// clean up when the scroll trigger when the video section unmounts
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<>
			<Hero />
			<div className="relative mx-auto my-8 w-11/12">
				<TopRated />
				{loadingProducts && <HomePageSkeleton />}
				{data && (
					<>
						{/* <Sorting setValue={setValue} data={data.products} /> */}
						<div className="mt-8 w-full">
							<h6 className="font-poppins text-lg font-medium text-center mt-16">
								Popular Now
							</h6>
							<div className="w-full">
								<div className="w-fit grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
									{productsData?.map((product: any) => (
										<Suspense key={product._id} fallback={<CardSkeleton />}>
											<ProductCard cart={cartItems} product={product} />
										</Suspense>
									))}
								</div>
							</div>
						</div>
						<Paginate
							pages={data.pages}
							page={data.page}
							setPageNumber={setPageNumber}
						/>
					</>
				)}
				<div className="hidden lg:block">
					<ProductCategoryUI />
				</div>
				<div className="relative w-full lg:hidden">
					<video
						id="video"
						ref={videoRef}
						autoPlay={video.startPlay}
						muted
						playsInline
						onEnded={() => setVideoComplete(true)}
						className="w-full h-full"
					>
						<source src={mobileVideo} type="video/mp4" />
					</video>
					<div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
						{lenovoProduct !== null && videoComplete && (
							<Link
								id="link"
								to={`/product/${lenovoProduct._id}`}
								className="text-white font-semibold text-md hover:cursor-pointer"
							>
								Check out the Lenovo ThinkPad x1 Carbon
							</Link>
						)}
					</div>
				</div>
				<div className="">
					{products && (
						<div className="w-11/12 mx-auto">
							<h6 className="font-poppins text-lg font-medium text-center mt-16">
								Highly Rated Products
							</h6>
							<div className="">
								<ProductsSlider products={products} />
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default HomePage;
