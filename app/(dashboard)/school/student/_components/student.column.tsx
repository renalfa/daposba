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

export type StudentRow = {
    id: string;
    school_name: string;
    school_npsn: string;
    new_student: number;
    graduated_student: number;
    ungraduated_student: number;
    repeat_student: number;
};

export const columns: ColumnDef<StudentRow>[] = [
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
        accessorKey: "new_student",
        header: () => <span className="font-semibold">Siswa Baru</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("new_student")}</span>,
    },
    {
        accessorKey: "graduated_student",
        header: () => <span className="font-semibold">Siswa Lulus</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("graduated_student")}</span>,
    },
    {
        accessorKey: "ungraduated_student",
        header: () => <span className="font-semibold">Siswa Tidak Lulus</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("ungraduated_student")}</span>,
    },
    {
        accessorKey: "repeat_student",
        header: () => <span className="font-semibold">Siswa Ulang</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("repeat_student")}</span>,
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
