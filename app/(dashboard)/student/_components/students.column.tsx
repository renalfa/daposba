"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
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
    nisn: string;
    nik: string;
    name: string;
    gender: "male" | "female";
    class_name: string;
    age: number;
    email: string;
    phone: string;
};

export const columns: ColumnDef<StudentRow>[] = [
    {
        accessorKey: "nisn",
        header: () => <span className="font-semibold">NISN</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nisn")}</code>,
    },
    {
        accessorKey: "nik",
        header: () => <span className="font-semibold">NIK</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nik")}</code>,
    },
    {
        accessorKey: "name",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("name")}</span>
                <span className="text-xs text-muted-foreground">{row.original.email}</span>
            </div>
        ),
    },
    {
        accessorKey: "gender",
        header: () => <span className="font-semibold">Gender</span>,
        cell: ({row}) => (
            <Badge variant="outline" className="capitalize">
                {row.getValue("gender")}
            </Badge>
        ),
    },
    {
        accessorKey: "class_name",
        header: () => <span className="font-semibold">Kelas</span>,
        cell: ({row}) => <span>{row.getValue("class_name")}</span>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "age",
        header: () => <span className="font-semibold">Umur</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("age")}</span>,
    },
    {
        accessorKey: "phone",
        header: () => <span className="font-semibold">No HP</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("phone")}</span>,
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
