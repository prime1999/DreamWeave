import { ReactNode } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
	children: ReactNode;
};

const SearchModal = ({ children }: Props) => {
	return (
		<Dialog>
			<DialogTrigger className="w-full">{children}</DialogTrigger>
			<DialogContent className="w-11/12 rounded-lg shadow-dark">
				<DialogHeader>
					<DialogTitle className="text-light">Search Products</DialogTitle>
					<DialogDescription>
						<form className="relative">
							<input
								type="text"
								placeholder="Search..."
								className="w-full border-b border-b-darkBorder bg-navDark mt-8 py-2 pl-6 text-light focus:outline-none"
							/>
							<FaMagnifyingGlass className="absolute top-11 left-1 text-light" />
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default SearchModal;
