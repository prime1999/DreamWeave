import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { IoMdPricetags, IoMdBookmarks } from "react-icons/io";
import {
	MdDateRange,
	MdOutlineBrandingWatermark,
	MdStarRate,
} from "react-icons/md";
import { FaRegUserCircle, FaProductHunt } from "react-icons/fa";
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

export type Product = {
	_id: string;
	name: string;
	user: Object;
	price: number;
	countInStock: number;
	brand: string;
	rating: number;
	createdAt: string;
};

export const columns: ColumnDef<Product>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value: any) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => {
			return (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value: any) => {
						row.toggleSelected(!!value);
						console.log(!row.getIsSelected() && row.original);
					}}
					aria-label="Select row"
				/>
			);
		},
	},
	{
		accessorKey: "user",
		header: () => (
			<div className="flex items-center">
				<FaRegUserCircle className="text-blue" />
				<p className="ml-2">Admin</p>
			</div>
		),
		cell: ({ row }) => {
			const user: any = row.getValue("user");

			return `${user?.name}`;
		},
	},
	{
		accessorKey: "name",
		header: () => (
			<div className="flex items-center">
				<FaProductHunt className="text-blue" />
				<p className="ml-2">Product</p>
			</div>
		),
	},
	{
		accessorKey: "brand",
		header: () => (
			<div className="flex items-center">
				<MdOutlineBrandingWatermark className="text-blue" />
				<p className="ml-2">Brand</p>
			</div>
		),
	},
	{
		accessorKey: "price",
		header: () => (
			<div className="flex items-center">
				<IoMdPricetags className="text-blue" />
				<p className="ml-2">Price</p>
			</div>
		),
	},
	{
		accessorKey: "countInStock",
		header: () => (
			<div className="flex items-center">
				<IoMdBookmarks className="text-blue" />
				<p className="ml-2">In-Stock</p>
			</div>
		),
	},
	{
		accessorKey: "rating",
		header: () => (
			<div className="flex items-center">
				<MdStarRate className="text-blue" />
				<p className="ml-2">Rating</p>
			</div>
		),
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
		id: "actions",
		cell: ({ row }) => {
			const product = row.original;

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
								onClick={() => navigator.clipboard.writeText(product._id)}
							>
								Copy Product's ID
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			);
		},
	},
];
