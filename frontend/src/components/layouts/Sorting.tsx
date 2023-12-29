import { useState, useEffect } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Props = {
	data: any;
	setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Sorting = ({ data, setValue }: Props) => {
	const [checkBrand, setCheckBrand] = useState<string[]>([]);

	useEffect(() => {
		let brands: string[] = [];
		if (data?.length !== 0) {
			data?.forEach((product: any) => {
				const { brand } = product;
				if (checkBrand.length === 0 || !checkBrand.includes(brand)) {
					brands.push(brand);
				}
			});
		}
		setCheckBrand(brands);
	}, [data]);
	return (
		<div className="w-11/12 mx-auto flex justify-between items-center">
			<div className="w-12">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className="bg-light rounded-3xl">
								Products Brand
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<NavigationMenuLink>
									<ul className="font-cour text-center">
										{checkBrand.length !== 0 &&
											checkBrand.map((brand, index) => (
												<li
													key={index}
													onClick={() => setValue(brand)}
													className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer"
												>
													{brand}
												</li>
											))}
										<li
											onClick={() => setValue("all")}
											className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer"
										>
											All
										</li>
									</ul>
								</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
};

export default Sorting;
