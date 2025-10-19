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
import {formatDateOnly} from "@/lib/utils";
import {IconAlertHexagonFilled, IconCircleCheckFilled} from "@tabler/icons-react";

export type UserDataRow = {
    id: string;
    email: string;
    status: "active" | "inactive";
    name: string;
    created_at: string;
};

export const columns: ColumnDef<UserDataRow>[] = [
    {
        accessorKey: "name",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("name")}</span>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <span className="font-semibold">Email</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("email")}</code>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
                {row.original.status === "active" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconAlertHexagonFilled className="fill-rose-600 dark:fill-rose-700" />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "created_at",
        header: () => <span className="font-semibold">Dibuat</span>,
        cell: ({row}) => <code className="text-xs">{formatDateOnly(row.getValue("created_at"))}</code>,
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
