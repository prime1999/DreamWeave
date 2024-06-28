import { Suspense, lazy, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	useFilterProductMutation,
	useGetProductsByCategoryQuery,
} from "@/slices/ProductSlice";
import WearableHero from "@/components/layouts/CategoryHero/WearableHero";
import CardSkeleton from "@/components/miscelleneous/CardSkeleton";
import Loader from "@/components/Loader";
import SmartPhoneHero from "@/components/layouts/CategoryHero/SmartPhoneHero";
import LaptopHero from "@/components/layouts/CategoryHero/LaptopHero";
import ProductFilter from "@/components/ProductsComponent/ProductFilter";
import PagesNavBar from "@/layouts/PagesNavBar";
import Paginate from "@/components/Paginate";
import HeadphoneHero from "@/components/layouts/CategoryHero/HeadphoneHero";
import GamingHero from "@/components/layouts/CategoryHero/GamingHero";

// for the lazy loading
const ProductCard = lazy(
	() => import("@/components/ProductsComponent/ProductCard")
);

const CategoryPage = () => {
	const params = useParams();
	const location = useLocation();
	const { data, isLoading } = useGetProductsByCategoryQuery({
		category: params.category,
	});
	// state to filter products
	const [details, setDetails] = useState<any>({
		brand: null,
		category: null,
		rating: null,
		minPrice: 0,
		maxPrice: 20000,
		pageNumber: 1,
	});

	const [filterProduct] = useFilterProductMutation() as any;
	//state for the breadCrumb
	const [breadCrumb, setBreadCrumb] = useState<string[]>([]);
	const [products, setProducts] = useState<any>([]);

	const { cartItems } = useSelector((state: any) => state.cart);

	useEffect(() => {
		const filter = async () => {
			const res = await filterProduct({ ...details }).unwrap();

			// init a result variable to an empty array
			let result: any[] = [];
			// check if the products are been filtered
			if (res.products === null) {
				// if yes the products are not been filtered
				data?.products?.map((product: any) => result.push(product));
			} else {
				// if no, then the products are been filtered
				res?.products?.map((product: any) => result.push(product));
			}
			// set the products to the result array
			setProducts(result);
		};
		filter();
	}, [data, details]);

	useEffect(() => {
		const url = location.pathname.split("/");
		setBreadCrumb(url);
	}, []);

	const renderHero = () => {
		if (data) {
			if (data?.category) {
				if (data.category === "wearable tech") {
					return <WearableHero />;
				}
				if (data.category === "laptops") {
					return <LaptopHero />;
				}
				if (data.category === "headphones") {
					return <HeadphoneHero />;
				}
				if (data.category === "gaming") {
					return <GamingHero />;
				}
				if (data.category === "smartphones") {
					return <SmartPhoneHero />;
				}
			} else {
				for (const product of data?.products || []) {
					if (product.category.includes("wearable tech")) {
						return <WearableHero />;
					}
					if (product.category.includes("laptops")) {
						return <LaptopHero />;
					}
					if (product.category.includes("headphones")) {
						return <HeadphoneHero />;
					}
					if (product.category.includes("gaming")) {
						return <GamingHero />;
					}
					if (product.category.includes("smartphones")) {
						return <SmartPhoneHero />;
					}
				}
			}
		}
	};
	return (
		<>
			<PagesNavBar />
			{isLoading && <Loader />}
			<div>{renderHero()}</div>
			{/* <div>{params.category === "laptops" && <LaptopHero />}</div>
			<div>{params.category === "smartphones" && <SmartPhoneHero />}</div>
			<div>{params.category === "headphones" && <HeadphoneHero />}</div>
			<div>{params.category === "gaming" && <GamingHero />}</div> */}
			<div className="w-11/12 mx-auto mt-8">
				<Breadcrumb>
					<BreadcrumbList>
						{breadCrumb.map((value, index) =>
							index === breadCrumb.length - 1 ? (
								<>
									<BreadcrumbItem className="font-medium text-black">
										{value}
									</BreadcrumbItem>
								</>
							) : index === 0 ? (
								<>
									<BreadcrumbItem>
										<BreadcrumbLink href="/">
											<CiHome />
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							) : (
								<>
									<BreadcrumbItem>
										<BreadcrumbLink href={`/category/${params.category}`}>
											{value}
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							)
						)}
					</BreadcrumbList>
				</Breadcrumb>

				<div className="mt-4 grid grid-cols-4">
					<div className="my-4 col-span-1">
						<ProductFilter
							categoryProducts={data?.products}
							details={details}
							setDetails={setDetails}
							products={products}
							param={params.category}
						/>
						{/* <Sorting setValue={setValue} data={data} /> */}
					</div>
					<div className="col-span-3 ">
						<h4 className="font-semibold text-2xl capitalize ml-4">
							{params.category}
						</h4>
						<div className="mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:w-full">
							{products?.map((product: any) => (
								<Suspense key={product._id} fallback={<CardSkeleton />}>
									<ProductCard cart={cartItems} product={product} />
								</Suspense>
							))}
						</div>
					</div>
				</div>
				<Paginate
					page={products.page}
					pages={products.pages}
					setDetails={setDetails}
				/>
			</div>
		</>
	);
};

export default CategoryPage;
