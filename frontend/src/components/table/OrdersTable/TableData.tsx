import { useState, useEffect } from "react";
import { MdFolderDelete } from "react-icons/md";
import { useDeleteOrderMutation } from "@/slices/OrderSlice";
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
	// useEffect(() => {}, [rowSelection]);

	const handleGroupDelete = () => {
		if (window.confirm("Are you sure")) {
			if (rowSelection) {
				const filtered = data.filter((order, index) => {
					return rowSelection.hasOwnProperty(index) && order;
				});

				if (filtered.length !== 0) {
					console.log(filtered);

					const deleteOrders = async () => {
						await Promise.all(
							filtered.map(async (order: any) => {
								await deleteOrder(order._id).unwrap();
							})
						);
					};

					deleteOrders();
				}
				refetch();
			}
		}
	};

	return (
		<>
			<div className="flex items-center justify-between py-4">
				<input
					placeholder="Filter name..."
					value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("status")?.setFilterValue(event.target.value)
					}
					className="max-w-md border rounded-md p-2 focus:outline-none"
				/>
				<button
					onClick={handleGroupDelete}
					disabled={!rowSelection ? true : false}
					className="flex items-center text-md border border-light rounded-md p-2 text-red-500 hover:bg-gray-50"
				>
					<MdFolderDelete className="text-lg" />
					<span className="ml-2">Delete selected</span>
				</button>
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
