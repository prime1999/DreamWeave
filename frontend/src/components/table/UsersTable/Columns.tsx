import { ColumnDef } from "@tanstack/react-table";
import { getDateDistance } from "@/utils/dateUtils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

export type User = {
	_id: string;
	name: string;
	isAdmin: string;
	email: string;
	createdAt: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "isAdmin",
		header: () => <div>Status</div>,
		cell: ({ row }) => {
			const admin = row.getValue("isAdmin");
			return admin ? "Admin" : "User";
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<button
					className="flex"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Signed up
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</button>
			);
		},
		cell: ({ row }) => {
			// format the date the order was created
			const date = row.getValue("createdAt");
			return getDateDistance(date as any);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;

			const handleUserDetails = (id: string) => {
				const cookie = (document.cookie = `userId=${id}`);
				console.log(cookie);
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
								onClick={() => navigator.clipboard.writeText(user._id)}
							>
								Copy User's ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => handleUserDetails(user._id)}
								className="hover:cursor-pointer"
							>
								View full user details
							</DropdownMenuItem>
							<DropdownMenuItem
								//onClick={() => handleRemoveOrder(order._id)}
								className="text-red-500 hover:cursor-pointer"
							>
								Delete user
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			);
		},
	},
];
