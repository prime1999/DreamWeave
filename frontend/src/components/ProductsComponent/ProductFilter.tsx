import { useCallback, useEffect, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ProductType } from "@/DataTypes/ProductType";

type Props = {
	products: ProductType[];
	details: any;
	categoryProducts: any;
	param: any;
	setDetails: React.Dispatch<any>;
};

const ProductFilter = ({
	categoryProducts,
	products,
	details,
	param,
	setDetails,
}: Props) => {
	// for the brands
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isChecked, setIsChecked] = useState<any>([]);
	const [brands, setBrands] = useState<string[]>([]);
	// for the categories
	const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
	const [isCategoryChecked, setIsCategoryChecked] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);

	useEffect(() => {
		let categoryArray: any[] = [];
		products.map((product: any) =>
			product.category.map(
				(c: any) =>
					c !== param && !categoryArray.includes(c) && categoryArray.push(c)
			)
		);
		setCategory(categoryArray);
		let brandsArray: string[] = [];
		categoryProducts?.map(
			(product: any) =>
				!brandsArray.includes(product.brand) && brandsArray.push(product.brand)
		);
		console.log(brandsArray);
		setBrands(brandsArray);
	}, [products]);

	// function to filter the products based on there brands
	const handleCheckboxChange = useCallback((brand: any) => {
		setIsChecked((prevState: any) => {
			const updatedState = prevState.includes(brand)
				? prevState.filter((c: any) => c !== brand)
				: [...prevState, brand];
			console.log(updatedState);
			// Update details state based on the updated isChecked state
			if (updatedState.length > 0) {
				setDetails((prevDetails: any) => ({
					...prevDetails,
					brand: updatedState,
					category: [param],
				}));
			} else {
				console.log("here");
				console.log(updatedState.length);
				setDetails((prevDetails: any) => ({
					...prevDetails,
					brand: null,
					category: [param],
				}));
			}

			return updatedState;
		});
	}, []);

	// function to filter producs based on there category
	const handleCategoryCheckboxChange = useCallback((c: any) => {
		setIsCategoryChecked((prevState: any) => {
			const updatedState = prevState.includes(c)
				? prevState.filter((c: any) => c !== c)
				: [...prevState, c];

			// Update details state based on the updated isCategoyChecked state
			if (!updatedState.includes(c)) {
				setDetails((prevDetails: any) => ({
					...prevDetails,
					category: [param, ...updatedState],
				}));
			} else {
				setDetails((prevDetails: any) => ({
					...prevDetails,
					category: [param, c],
				}));
			}

			return updatedState;
		});
	}, []);

	return (
		<div>
			<div className="w-10/12 font-poppins">
				<Collapsible open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
					<CollapsibleTrigger className="w-full flex items-center justify-between font-medium">
						Brands <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
					</CollapsibleTrigger>
					<CollapsibleContent>
						{brands.map((brand) => (
							<div
								key={brand}
								className="w-full flex items-center justify-between"
							>
								<p className="my-4 text-sm text-gray-500 font-medium">
									{brand}
								</p>
								<Checkbox
									className="w-4 h-4"
									checked={isChecked.includes(brand)}
									onCheckedChange={() => handleCheckboxChange(brand)}
								/>
							</div>
						))}
					</CollapsibleContent>
				</Collapsible>
				<hr className="border border-gray-300 my-8" />
				<div>
					<Collapsible
						open={isCategoryOpen}
						onOpenChange={() => setIsCategoryOpen(!isCategoryOpen)}
					>
						<CollapsibleTrigger className="w-full flex items-center justify-between font-medium">
							Category{" "}
							<span>
								{isCategoryOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
							</span>
						</CollapsibleTrigger>
						<CollapsibleContent>
							{category.map((c: any, index: number) => (
								<div
									key={index}
									className="w-full flex items-center justify-between"
								>
									<p className="my-4 text-sm text-gray-500 font-medium">{c}</p>
									<Checkbox
										className="w-4 h-4"
										checked={isCategoryChecked.includes(c)}
										onCheckedChange={() => handleCategoryCheckboxChange(c)}
									/>
								</div>
							))}
						</CollapsibleContent>
					</Collapsible>
				</div>
			</div>
		</div>
	);
};

export default ProductFilter;
