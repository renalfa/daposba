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

export type AdministrationDataRow = {
    id: string;
    name: string;
    npsn: string;
    status: "swasta" | "negeri";
    type: "kb" | "tk" | "sd" | "smp" | "sma";
    address: string;
    district: string;
    registration_code: string;
};

export const columns: ColumnDef<AdministrationDataRow>[] = [
    {
        accessorKey: "name",
        header: () => <span className="font-semibold">Nama Sekolah</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("name")}</span>
            </div>
        ),
    },
    {
        accessorKey: "npsn",
        header: () => <span className="font-semibold">NPSN</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("npsn")}</code>,
    },
    {
        accessorKey: "status",
        header: () => <span className="font-semibold">Status</span>,
        cell: ({row}) => (
            <Badge variant="outline" className="capitalize">
                {row.getValue("status")}
            </Badge>
        ),
    },
    {
        accessorKey: "type",
        header: () => <span className="font-semibold">Bentuk</span>,
        cell: ({row}) => (
            <Badge variant="outline" className="uppercase">
                {row.getValue("type")}
            </Badge>
        ),
    },
    {
        accessorKey: "address",
        header: () => <span className="font-semibold">Alamat</span>,
        cell: ({row}) => <span>{row.getValue("address")}</span>,
        enableColumnFilter: true,
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
