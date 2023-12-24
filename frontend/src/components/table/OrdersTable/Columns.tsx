import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { IoMdPricetags } from "react-icons/io";
import { GiNetworkBars } from "react-icons/gi";
import { MdDateRange, MdPayments, MdOutlinePaid } from "react-icons/md";
import { changeDateFormat } from "@/utils/dateUtils";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type User = {
	_id: string;
	itemsPrice: number;
	isPaid: boolean;
	status: string;
	paymentMethod: string;
	createdAt: string;
};

export const columns: ColumnDef<User>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => {
						row.toggleSelected(!!value);
						console.log(!row.getIsSelected() && row.original);
					}}
					aria-label="Select row"
				/>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<div className="flex items-center hover:cursor-pointer">
				<MdDateRange className="text-blue" />
				<p className="ml-2">Date</p>
				<ArrowUpDown
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="ml-2 h-4 w-4 hover:cursor-pointer"
				/>
			</div>
		),
		cell: ({ row }) => {
			const date: string = row.getValue("createdAt");
			return changeDateFormat(date);
		},
	},
	{
		accessorKey: "status",
		header: () => (
			<div className="flex items-center">
				<GiNetworkBars className="text-blue" />
				<p className="ml-2">Status</p>
			</div>
		),
	},
	{
		accessorKey: "itemsPrice",
		header: () => (
			<div className="flex items-center">
				<IoMdPricetags className="text-blue" />
				<h6 className="ml-2">Price</h6>
			</div>
		),
		cell: ({ row }) => {
			const price = row.getValue("itemsPrice");
			return `$${price}`;
		},
	},
	{
		accessorKey: "paymentMethod",
		header: () => (
			<div className="flex items-center">
				<MdPayments className="text-blue" />
				<p className="ml-2">Payment Method</p>
			</div>
		),
	},
	{
		accessorKey: "isPaid",
		header: () => (
			<div className="flex items-center">
				<MdOutlinePaid className="text-blue" />
				<p>Payment</p>
			</div>
		),
		cell: ({ row }) => {
			const isPaid = row.getValue("isPaid");
			return `${isPaid ? "Paid" : "Not-Paid"}`;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const order = row.original;

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
								Copy Order's ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								//onClick={() => handleUserDetails(user._id)}
								className="hover:cursor-pointer"
							>
								View full Order's details
							</DropdownMenuItem>
							<DropdownMenuItem
								//onClick={() => handleRemoveOrder(order._id)}
								className="text-red-500 hover:cursor-pointer"
							>
								Delete order
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			);
		},
	},
];
