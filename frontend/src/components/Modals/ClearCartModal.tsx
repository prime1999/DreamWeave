import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useClearCartMutation } from "@/slices/CartApiSlice";
import { clearCartItems } from "@/slices/CartSlice";

type Props = {
	children: ReactNode;
};

const ClearCartModal = ({ children }: Props) => {
	const dispatch = useDispatch();
	const [clearCart] = useClearCartMutation();

	const handleClearCart = async () => {
		try {
			await clearCart({});
			dispatch(clearCartItems());
			toast.success("Cart cleared", {
				className: "bg-green-200",
				bodyClassName: "text-black",
				progressClassName: "bg-transparent",
			});
		} catch (error) {
			// throw an error if they don't
			toast.error("Cart could not be cleared, try again", {
				className: "bg-red-200",
				bodyClassName: "text-light",
				progressClassName: "bg-transparent",
			});
		}
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger className="w-full">{children}</DialogTrigger>
				<DialogContent className="w-72 rounded-lg shadow-light md:w-96">
					<DialogHeader>
						<DialogTitle className="mb-4">Are You Sure?</DialogTitle>
						<DialogDescription className="flex justify-between items-center">
							<DialogClose asChild>
								<button className="bg-red-500 px-4 py-2 rounded-lg w-24 duration-500 text-light font-semibold hover:bg-red-600">
									Cancel
								</button>
							</DialogClose>
							<DialogClose asChild>
								<button
									onClick={handleClearCart}
									className="bg-green-500 px-4 py-2 rounded-lg w-24 duration-500 text-light font-semibold hover:bg-green-600"
								>
									Delete
								</button>
							</DialogClose>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ClearCartModal;
