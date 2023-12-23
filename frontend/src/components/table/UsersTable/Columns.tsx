import { ColumnDef } from "@tanstack/react-table";
import { getDateDistance } from "@/utils/dateUtils";
import { toast } from "react-toastify";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";

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
		header: () => <div>Signed up</div>,
		cell: ({ row }) => {
			// format the date the order was created
			const date = row.getValue("createdAt");
			return getDateDistance(date as any);
		},
	},
];
