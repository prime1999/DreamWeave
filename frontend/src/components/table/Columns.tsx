import { ColumnDef } from "@tanstack/react-table";
import { changeDateFormat } from "@/utils/dateUtils";
import { toast } from "react-toastify";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
	useDeleteOrderMutation,
	useGetUserOrderQuery,
} from "@/slices/OrderSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import OrderDetailsModal from "../Modals/OrderDetailsModal";
import { setDate } from "date-fns";

export type Order = {
	_id: string;
	items: number;
	createdAt: string;
	totalAmount: string;
	status: string;
	iPaid: boolean;
};

export const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "items.length",
		header: "Item",
	},
	{
		accessorKey: "createdAt",
		header: () => <div>Order-Date</div>,
		cell: ({ row }) => {
			// format the date the order was created
			const date = row.getValue("createdAt");
			return changeDateFormat(date as any);
		},
	},
	{
		accessorKey: "totalAmount",
		header: () => <div>Amount</div>,
		cell: ({ row }) => {
			// format the amount to include the dollar sign
			const amount = parseFloat(row.getValue("totalAmount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "isPaid",
		header: () => <div>isPaid</div>,
		cell: ({ row }) => {
			const paid = row.getValue("isPaid");
			return `${paid ? "Paid" : "Not-paid"}`;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const order = row.original;
			const [id, setId] = useState<string>("");
			// get the function to delete an order
			const [deleteOrder] = useDeleteOrderMutation();
			// get the refectch function
			const { refetch } = useGetUserOrderQuery({});
			// function to remove an order
			const handleRemoveOrder = async (orderId: string) => {
				// make a try-catch block
				try {
					// await on the delete order function with the order's id passed in as an argument
					await deleteOrder(orderId);
					// show a success message
					toast.success("Order has been removed", {
						className: "bg-green-200",
						bodyClassName: "text-black font-poppins font-semibold",
						progressClassName: "bg-transparent",
					});
					// call the refetch function to fetch the order again
					refetch();
				} catch (err: any) {
					// show an error message if anything goes wrong in the try block
					toast.error(err?.data?.error, {
						className: "bg-red-200",
						bodyClassName: "text-black",
						progressClassName: "bg-transparent",
					});
				}
			};

			const handleClick = (currentId: string) => {
				console.log(currentId);
				setId(currentId);
				console.log(currentId);
			};
			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								className="hover:cursor-pointer"
								onClick={() => navigator.clipboard.writeText(order._id)}
							>
								Copy order ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => handleClick(order._id)}
								className="hover:cursor-pointer"
							>
								View full order details
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleRemoveOrder(order._id)}
								className="text-red-500 hover:cursor-pointer"
							>
								Delete order
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{id === order._id && <OrderDetailsModal orderId={order._id} />}
				</>
			);
		},
	},
];
