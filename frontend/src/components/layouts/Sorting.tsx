import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Sorting = () => {
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
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Google
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Samsung
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Asus
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Apple
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Hp
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Acer
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Lenovo
										</li>
										<li className="px-6 py-2 border-b hover:bg-light hover:cursor-pointer">
											Microsoft
										</li>
										<li className="px-6 py-2 hover:bg-light hover:cursor-pointer">
											Others
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
