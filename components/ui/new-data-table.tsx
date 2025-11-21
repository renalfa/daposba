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
import {ChevronDown, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Search} from "lucide-react";

export type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchableColumn?: keyof TData & string;
    facetedFilters?: Record<string, {label: string; value: string}[]>;
    /** initial page size (kalau tidak pakai server-side) */
    pageSize?: number;

    /**
     * SERVER-SIDE PAGINATION (opsional)
     * Kalau diisi, DataTable akan pakai mode manualPagination
     */
    manualPagination?: boolean;
    /** page index 0-based dari luar (mapping dari current_page - 1) */
    pageIndex?: number;
    /** page size aktif dari server (mapping dari per_page) */
    serverPageSize?: number;
    /** total halaman (mapping dari last_page) */
    pageCount?: number;
    /** total item (mapping dari total) -> cuma buat display */
    totalItems?: number;
    /** callback ketika user ganti halaman */
    onPageChange?: (pageIndex: number) => void;
    /** callback ketika user ganti page size */
    onPageSizeChange?: (pageSize: number) => void;
};

export function NewDataTable<TData, TValue>({
    columns,
    data,
    searchableColumn,
    facetedFilters,
    pageSize = 10,
    manualPagination = false,
    pageIndex,
    serverPageSize,
    pageCount,
    totalItems,
    onPageChange,
    onPageSizeChange,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState<string>("");

    // local pagination state (dipakai kalau TIDAK manualPagination)
    const [localPagination, setLocalPagination] = React.useState({
        pageIndex: 0,
        pageSize,
    });

    const isManual = manualPagination && typeof pageCount === "number";

    const currentPagination = isManual
        ? {
              pageIndex: pageIndex ?? 0,
              pageSize: serverPageSize ?? localPagination.pageSize,
          }
        : localPagination;

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination: currentPagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        // handle pagination
        onPaginationChange: isManual
            ? (updater) => {
                  if (!onPageChange && !onPageSizeChange) return;

                  const next = typeof updater === "function" ? updater(currentPagination) : updater;

                  // trigger ke luar
                  if (next.pageIndex !== currentPagination.pageIndex) {
                      onPageChange?.(next.pageIndex);
                  }
                  if (next.pageSize !== currentPagination.pageSize) {
                      onPageSizeChange?.(next.pageSize);
                  }
              }
            : setLocalPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: isManual,
        pageCount: isManual ? pageCount : undefined,
        initialState: isManual
            ? {}
            : {
                  pagination: {
                      pageSize,
                  },
              },
    });

    // Quick search
    const searchValue = searchableColumn
        ? (table.getColumn(searchableColumn)?.getFilterValue() as string) ?? ""
        : globalFilter;

    const setSearchValue = (val: string) => {
        if (searchableColumn) table.getColumn(searchableColumn)?.setFilterValue(val);
        else setGlobalFilter(val);
    };

    const currentPageNumber = table.getState().pagination.pageIndex + 1;
    const totalPages = isManual && pageCount ? pageCount : table.getPageCount();

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                    <div className="flex-1 relative">
                        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                        <Input
                            placeholder={`Cari ${searchableColumn ?? "..."}`}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="max-w-xs pl-8"
                        />
                    </div>
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

            {/* Table */}
            <div className="rounded-lg border bg-background overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted">
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

            {/* Pagination footer */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                    <span>
                        Halaman <Badge variant="secondary">{currentPageNumber}</Badge> dari{" "}
                        <Badge variant="secondary">{totalPages || 1}</Badge>
                    </span>
                    {typeof totalItems === "number" && (
                        <span>
                            • Total: <Badge variant="outline">{totalItems}</Badge> data
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(v) => {
                            const size = Number(v);
                            if (isManual) {
                                onPageSizeChange?.(size);
                            } else {
                                table.setPageSize(size);
                            }
                        }}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 25, 50].map((size) => (
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
                            disabled={currentPageNumber === 1}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.previousPage()}
                            disabled={currentPageNumber === 1}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.nextPage()}
                            disabled={currentPageNumber === totalPages || totalPages === 0}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => table.setPageIndex(totalPages - 1)}
                            disabled={currentPageNumber === totalPages || totalPages === 0}>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
