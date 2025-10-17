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

export type TeacherRow = {
    id        : string;
    nuptk     : string;
    nip       : string;
    nik       : string;
    name      : string;
    gender    : "male" | "female";
    location  : string;
    birth_date: string;
    status    : "induk" | "non-induk";
    email     : string;
};

export const columns: ColumnDef<TeacherRow>[] = [
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
        accessorKey: "nik",
        header: () => <span className="font-semibold">NIK</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nik")}</code>,
    },
    {
        accessorKey: "nuptk",
        header: () => <span className="font-semibold">NUPTK</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nuptk")}</code>,
    },
    {
        accessorKey: "nip",
        header: () => <span className="font-semibold">NIP</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nip")}</code>,
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
        accessorKey: "location",
        header: () => <span className="font-semibold">Tempat Lahir</span>,
        cell: ({row}) => <span>{row.getValue("location")}</span>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "birth_date",
        header: () => <span className="font-semibold">Tanggal Lahir</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("birth_date")}</span>,
    },
    {
        accessorKey: "status",
        header: () => <span className="font-semibold">Status</span>,
        cell: ({row}) => <span className="tabular-nums">{row.getValue("status")}</span>,
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
