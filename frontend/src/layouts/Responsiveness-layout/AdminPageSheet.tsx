import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
	FaProductHunt,
	FaShippingFast,
	FaUsers,
	FaQuestionCircle,
} from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { IoIosChatbubbles } from "react-icons/io";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
	children: ReactNode;
};

const AdminPageSheet = ({ children }: Props) => {
	return (
		<>
			<Sheet>
				<SheetTrigger>{children}</SheetTrigger>
				<SheetContent className="w-36" side="left">
					<SheetHeader>
						<SheetDescription className="flex flex-col mt-8">
							<Link
								to="/"
								className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light active:bg-blue active:text-light"
							>
								<FaProductHunt className="mr-2" />
								Products
							</Link>

							<Link
								to="/"
								className="flex items-center my-2 h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
							>
								<FaShippingFast className="mr-2" />
								Orders
							</Link>

							<Link
								to="/"
								className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
							>
								<FaUsers className="mr-2" />
								Users
							</Link>

							<Link
								to="/"
								className="flex items-center my-2 h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
							>
								<TbPigMoney className="mr-2" />
								Statistics
							</Link>

							<Link
								to="/"
								className="flex items-center h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
							>
								<FaQuestionCircle className="mr-2" />
								FAQ
							</Link>

							<Link
								to="/"
								className="flex items-center mt-2 h-8 w-24 justify-center rounded-md duration-500 hover:bg-blue hover:text-light"
							>
								<IoIosChatbubbles className="mr-2" />
								Support
							</Link>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default AdminPageSheet;
