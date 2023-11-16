import { MdKeyboardArrowDown } from "react-icons/md";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center border px-4 py-1 font-poppins text-sm rounded-2xl">
						<p>sort by</p>
						<MdKeyboardArrowDown className="ml-1" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};

export default Sorting;
