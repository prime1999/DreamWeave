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
	setDetails: React.Dispatch<any>;
};

const ProductFilter = ({
	categoryProducts,
	products,
	details,
	setDetails,
}: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [isChecked, setIsChecked] = useState<any>([]);
	const [brands, setBrands] = useState<string[]>([]);

	useEffect(() => {
		let brandsArray: string[] = [];
		categoryProducts?.map(
			(product: any) =>
				!brandsArray.includes(product.brand) && brandsArray.push(product.brand)
		);
		console.log(brandsArray);
		setBrands(brandsArray);
	}, [products]);

	// const getFilteredDetails = (brand: any) => {
	// 	if (isChecked.length > 0) {
	// 		setDetails((prevState: any) => ({
	// 			...prevState,
	// 			brand: isChecked,
	// 		}));
	// 	} else {
	// 		setDetails((prevState: any) => ({
	// 			...prevState,
	// 			brand: [brand],
	// 		}));
	// 	}
	// 	console.log(isChecked);
	// 	console.log(details);
	// };

	const handleCheckboxChange = useCallback((brand: any) => {
		setIsChecked((prevState: any) => {
			const updatedState = prevState.includes(brand)
				? prevState.filter((c: any) => c !== brand)
				: [...prevState, brand];

			// Update details state based on the updated isChecked state
			if (updatedState.length > 0) {
				setDetails((prevDetails: any) => ({
					...prevDetails,
					brand: updatedState,
				}));
			} else {
				setDetails((prevDetails: any) => ({
					...prevDetails,
					brand: [brand],
				}));
			}

			return updatedState;
		});
	}, []);

	// Use useEffect to log the updated details state
	useEffect(() => {
		console.log(details);
	}, [details]);

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
			</div>
		</div>
	);
};

export default ProductFilter;
