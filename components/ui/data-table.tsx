"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
// import { rankItem } from "@tanstack/match-sorter-utils"; // optional fuzzy
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ChevronDown, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight} from "lucide-react";

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /**
     * Optional: Which column key is used for the quick search box.
     * If omitted, a global filter is used instead.
     */
    searchableColumn?: keyof TData & string;
    /** Optional: map of columnId -> available filter values (for faceted filter). */
    facetedFilters?: Record<string, {label: string; value: string}[]>;
    /** Optional: initial page size */
    pageSize?: number;
};

export function DataTable<TData, TValue>({
    columns,
    data,
    searchableColumn,
    facetedFilters,
    pageSize = 10,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState<string>("");

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // Optional fuzzy filter example:
        // filterFns: {
        // fuzzy: (row, columnId, value, addMeta) => {
        // const itemRank = rankItem(String(row.getValue(columnId) ?? ""), value);
        // addMeta({ itemRank });
        // return itemRank.passed;
        // },
        // },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    // Quick search: either per-column or global
    const searchValue = searchableColumn
        ? (table.getColumn(searchableColumn)?.getFilterValue() as string) ?? ""
        : globalFilter;

    const setSearchValue = (val: string) => {
        if (searchableColumn) table.getColumn(searchableColumn)?.setFilterValue(val);
        else setGlobalFilter(val);
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <Input
                        placeholder={`Search ${searchableColumn ?? "..."}`}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="max-w-xs"
                    />
                    {facetedFilters &&
                        Object.entries(facetedFilters).map(([columnId, options]) => {
                            const col = table.getColumn(columnId);
                            if (!col) return null;
                            const value = (col.getFilterValue() as string) ?? "";
                            return (
                                <Select
                                    key={columnId}
                                    value={value}
                                    onValueChange={(v) => col.setFilterValue(v === "__all__" ? undefined : v)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={`Filter ${columnId}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__all__">All</SelectItem>
                                        {options.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            );
                        })}
                    {searchValue || columnFilters.length > 0 ? (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setSearchValue("");
                                table.resetColumnFilters();
                            }}>
                            Reset
                        </Button>
                    ) : null}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllLeafColumns()
                            .filter((col) => col.getCanHide())
                            .map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    className="capitalize"
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(v) => col.toggleVisibility(!!v)}>
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-2xl border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : undefined
                                                }
                                                onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{asc: " ▲", desc: " ▼"}[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">
                    Page <Badge variant="secondary">{table.getState().pagination.pageIndex + 1}</Badge> of{" "}
                    <Badge variant="secondary">{table.getPageCount()}</Badge>
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(v) => table.setPageSize(Number(v))}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 30, 40, 50].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    Show {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
