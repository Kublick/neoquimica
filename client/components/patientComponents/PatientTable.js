import {
	useTable,
	useSortBy,
	usePagination,
	useGlobalFilter,
	useAsyncDebounce,
} from "react-table";
// import GlobalFilter from "./GlobalFilter";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Card from "@material-tailwind/react/Card";

const PatientTable = ({ data, columns }) => {
	const tableInstace = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		state,
		page,
		setGlobalFilter,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageSize,
		setPageSize,
	} = tableInstace;

	const { globalFilter, pageIndex } = state;

	return (
		<Card>
			<div className="">
				<CardHeader color="indigo" contentPosition="center">
					<h2 className="text-2xl text-white">Pacientes</h2>
				</CardHeader>
			</div>
			<CardBody>
				<div>
					{/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
					<div className="overflow-x-auto">
						<table
							className="items-center w-full bg-transparent border-collapse"
							{...getTableProps()}
						>
							<thead>
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
												className="px-2 py-3 text-sm font-light text-center text-purple-500 align-middle border-b border-gray-200 border-solid whitespace-nowrap"
											>
												{column.render("Header")}
												<span>
													{column.isSorted
														? column.isSortedDesc
															? " 🠗"
															: "  🠕"
														: ""}
												</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()} className="">
								{page.map((row) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map((cell) => {
												return (
													<td
														className="px-2 py-4 text-sm font-light text-center align-middle border-b border-gray-200 whitespace-nowrap"
														{...cell.getCellProps()}
													>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<div className="flex justify-between py-4 border-t bg-gray-50">
							<div className="mx-4 font-bold">
								<p>
									Showing page {pageIndex + 1} of {pageOptions.length} pages
								</p>
							</div>
							<div>
								<span>
									Go to page:{" "}
									<input
										type="number"
										defaultValue={pageIndex + 1}
										min="1"
										max={pageOptions.length}
										onChange={(e) => {
											const page = e.target.value
												? Number(e.target.value) - 1
												: 0;
											gotoPage(page);
										}}
										className="w-20 px-2 border-2 rounded"
									/>
								</span>
								<select
									className="px-2 mx-2 bg-white"
									value={pageSize}
									onChange={(e) => {
										setPageSize(Number(e.target.value));
									}}
								>
									{[5, 10, 20].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</select>
							</div>
							<div className="mr-4">
								<button
									disabled={!canPreviousPage}
									className="mx-4"
									onClick={() => previousPage()}
								>
									Previous
								</button>

								<button onClick={() => nextPage()} disabled={!canNextPage}>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default PatientTable;
