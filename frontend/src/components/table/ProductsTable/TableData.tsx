import { useState } from "react";
import { MdFolderDelete } from "react-icons/md";
import { useDeleteProductMutation } from "@/slices/ProductSlice";
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
	data: any;
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

	const [deleteProduct, { isLoading }] = useDeleteProductMutation();

	// function to delete selected orders
	const handleGroupDelete = () => {
		// show a confirmation alert message before proceeding
		if (window.confirm("Are you sure")) {
			// check if the rowSelection state is truthy
			if (rowSelection) {
				// if yes, filter the product that is of the same index as the key in the rowselection
				const filtered = data.filter((product: any, index: any) => {
					return rowSelection.hasOwnProperty(index) && product;
				});
				// check if any product was filtered
				if (filtered.length !== 0) {
					// create a function to delete the products
					const deleteProducts = async () => {
						// make a promise to resolvev the asyncronise function, so fot the delete product to work for all the orders
						await Promise.all(
							// mp through the filtered orders
							filtered.map(async (product: any) => {
								console.log(product._id);
								// await on the delete product function
								await deleteProduct(product._id).unwrap();
							})
						);
					};
					// call the delete product function
					deleteProducts();
					// refetch the orders for real time update
					refetch();
				}
				console.log(data);
			}
		}
	};

	const handleChange = (value: string) => {
		setStatus(value);
	};

	return (
		<>
			<div className="flex items-center justify-between py-4">
				<input
					placeholder="Find by Admin..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="w-96 border rounded-md p-2 focus:outline-none"
				/>
				{Object.keys(rowSelection).length !== 0 && (
					<div className="flex items-center">
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
