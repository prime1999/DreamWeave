import { ColumnDef } from "@tanstack/react-table";
import { changeDateFormat } from "@/utils/dateUtils";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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
			const date = row.getValue("createdAt");
			return changeDateFormat(date as any);
		},
	},
	{
		accessorKey: "totalAmount",
		header: () => <div>Amount</div>,
		cell: ({ row }) => {
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

			return (
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
						<DropdownMenuItem className="hover:cursor-pointer">
							View full order details
						</DropdownMenuItem>
						<DropdownMenuItem className="text-red-500 hover:cursor-pointer">
							Delete order
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
