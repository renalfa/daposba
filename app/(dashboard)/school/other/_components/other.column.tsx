"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";

export type OtherRow = {
    id: string;
    school_name: string;
    school_npsn: string;
    total_table: number;
    total_chair: number;
    total_board: number;
    total_computer: number;
    total_teacher: number;
};

export const columns: ColumnDef<OtherRow>[] = [
    {
        accessorKey: "school_name",
        header: () => <span className="font-semibold">Nama Sekolah</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("school_name")}</span>
            </div>
        ),
    },
    {
        accessorKey: "school_npsn",
        header: () => <span className="font-semibold">NPSN</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("school_npsn")}</code>,
    },
    {
        accessorKey: "total_table",
        header: () => <span className="font-semibold">Jumlah Meja</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("total_table")}</span>,
    },
    {
        accessorKey: "total_chair",
        header: () => <span className="font-semibold">Jumlah Kursi</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("total_chair")}</span>,
    },
    {
        accessorKey: "total_board",
        header: () => <span className="font-semibold">Jumlah Papan Tulis</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("total_board")}</span>,
    },
    {
        accessorKey: "total_computer",
        header: () => <span className="font-semibold">Jumlah Komputer</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("total_computer")}</span>,
    },
    {
        accessorKey: "total_teacher",
        header: () => <span className="font-semibold">Jumlah Guru</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("total_teacher")}</span>,
    },
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon">
                        <EllipsisVertical />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
