import { useState } from "react";
import { MdFolderDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import {
	useDeleteOrderMutation,
	useUpdateOrderStatusMutation,
} from "@/slices/OrderSlice";
import {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	getPaginationRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
	refetch: any;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	refetch,
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<any>({});
	const [status, setStatus] = useState<string>("");
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			columnFilters,
			sorting,
			rowSelection,
		},
	});

	const [deleteOrder, { isLoading }] = useDeleteOrderMutation();
	const [updateOrderStatus, { isLoading: updateLoading }] =
		useUpdateOrderStatusMutation();
	// function to delete selected orders
	const handleGroupDelete = () => {
		// show a confirmation alert message before proceeding
		if (window.confirm("Are you sure")) {
			// check if the rowSelection state is truthy
			if (rowSelection) {
				// if yes, filter the order that is of the same index as the key in the rowselection
				const filtered = data.filter((order, index) => {
					return rowSelection.hasOwnProperty(index) && order;
				});
				// check if any order was filtered
				if (filtered.length !== 0) {
					// create a function to delete the orders
					const deleteOrders = async () => {
						// make a promise to resolvev the asyncronise function, so fot the delete Order to work for all the orders
						await Promise.all(
							// mp through the filtered orders
							filtered.map(async (order: any) => {
								// await on the delete order function
								await deleteOrder(order._id).unwrap();
							})
						);
					};
					// call the delete order function
					deleteOrders();
				}
				// refetch the orders for real time update
				refetch();
			}
		}
	};

	// function to change the order status
	const handleChangeStatus = () => {
		// show a confirmation alert message before proceeding
		if (window.confirm("Are you sure")) {
			// check if the rowSelection state is truthy
			if (rowSelection) {
				// if yes, filter the order that is of the same index as the key in the rowselection
				const filtered = data.filter((order, index) => {
					return rowSelection.hasOwnProperty(index) && order;
				});
				// check if any order was filtered
				if (filtered.length !== 0) {
					// create a function to update the orders
					const updateOrders = async () => {
						// make a promise to resolve the asyncronise function, so for the update Order to work for all the orders
						await Promise.all(
							// mp through the filtered orders
							filtered.map(async (order: any) => {
								// await on the update order function
								console.log({
									id: order._id,
									status,
								});
								await updateOrderStatus({
									id: order._id,
									status,
								}).unwrap();
							})
						);
					};
					// call the update order function
					updateOrders();
				}
				// refetch the orders for real time update
				refetch();
			}
		}
	};

	const handleChange = (value: string) => {
		setStatus(value);
		console.log(status);
	};

	return (
		<>
			<div className="flex items-center justify-between py-4">
				<input
					placeholder="Find customer's order by ID"
					value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("user")?.setFilterValue(event.target.value)
					}
					className="w-96 border rounded-md p-2 focus:outline-none"
				/>
				{Object.keys(rowSelection).length !== 0 && (
					<div className="flex items-center">
						<div className="flex items-center">
							<Select onValueChange={(e) => handleChange(e)}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Update Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="processing">Processing</SelectItem>
									<SelectItem value="shipped">Shipped</SelectItem>
									<SelectItem value="delivered">Delivered</SelectItem>
									<SelectItem value="cancelled">Cancelled</SelectItem>
								</SelectContent>
							</Select>
							<button
								onClick={handleChangeStatus}
								className="flex items-center bg-blue p-2 rounded-md text-light ml-2 font-semibold duration-500 hover:bg-cyan-700"
							>
								<GrDocumentUpdate />
								<p className="ml-2">Update</p>
							</button>
						</div>
						<button
							onClick={handleGroupDelete}
							disabled={!rowSelection ? true : false}
							className="flex items-center ml-4 text-md bg-red-500 font-semibold rounded-md p-2 text-light duration-500 hover:bg-red-600"
						>
							<MdFolderDelete className="text-lg" />
							<span className="ml-2">Delete selected</span>
						</button>
					</div>
				)}
			</div>
			<div className="rounded-md border">
				<Table className="text-black">
					<TableHeader className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className="text-black font-bold" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="font-semibold">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<DataTablePagination table={table} />
			</div>
		</>
	);
}
