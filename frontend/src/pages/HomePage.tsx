import Sorting from "../components/layouts/Sorting";
import Hero from "../components/layouts/Hero";
import { useGetProductsQuery } from "@/slices/ProductSlice";

const HomePage = () => {
	const { data } = useGetProductsQuery({} as any);
	return (
		<div>
			<Hero />
			<div className="container mx-auto my-8">
				<Sorting />
				{data && <h1>{data[0].name}</h1>}
			</div>
		</div>
	);
};

export default HomePage;
