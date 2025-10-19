"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {formatDateOnly} from "@/lib/utils";
import {IconAlertHexagonFilled, IconCircleCheckFilled} from "@tabler/icons-react";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import { Eye } from "lucide-react";

export type LogAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "VIEW" | "ACCESS" | "FAILED_LOGIN";

export type LogStatus = "SUCCESS" | "FAILED";

export type LogRow = {
    id: string;
    user_id: string | null;
    action: LogAction;
    entity: string | null;
    entity_id?: string | null;
    module?: string | null;
    description?: string | null;
    old_data?: Record<string, any> | null;
    new_data?: Record<string, any> | null;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | null;
    endpoint?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    status?: LogStatus;
    performed_by?: string | null;
    created_at: string;
};

function JsonPreview({value, label}: {value?: Record<string, any> | null; label: string}) {
    const [open, setOpen] = useState(false);
    if (!value) return <span className="text-muted-foreground">-</span>;
    const compact = JSON.stringify(value);
    const pretty = JSON.stringify(value, null, 2);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-2 h-8 text-xs" title={`View ${label}`}>
                    <Eye className="text-muted-foreground text-sm" /> Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">{compact.length} chars</div>
                    <ScrollArea className="h-[30vh] rounded-md border">
                        <pre className="p-4 text-xs leading-5 whitespace-pre-wrap break-words">{pretty}</pre>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export const columns: ColumnDef<LogRow>[] = [
    {
        accessorKey: "id",
        header: () => <span className="font-semibold">ID</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("id")}</span>
                <span className="text-xs text-muted-foreground">{formatDateOnly(row.original.created_at)}</span>
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: () => <span className="font-semibold">Aksi</span>,
        cell: ({row}) => (
            <Badge variant="outline" className="capitalize">
                {row.getValue("action")}
            </Badge>
        ),
    },
    {
        accessorKey: "method",
        header: () => <span className="font-semibold">Method</span>,
        cell: ({row}) => (
            <Badge variant="outline" className="capitalize">
                {row.getValue("method")}
            </Badge>
        ),
    },
    {
        accessorKey: "endpoint",
        header: () => <span className="font-semibold">Endpoint</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("endpoint")}</code>,
    },
    {
        accessorKey: "ip_address",
        header: () => <span className="font-semibold">Alamat IP</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("ip_address")}</code>,
    },
    {
        accessorKey: "module",
        header: () => <span className="font-semibold">Modul</span>,
        cell: ({row}) => <span>{row.getValue("module")}</span>,
    },
    {
        accessorKey: "old_data",
        header: () => <span className="font-semibold">Data Lama</span>,
        cell: ({row}) => <JsonPreview value={row.getValue("old_data")} label="Data Lama" />,
    },
    {
        accessorKey: "new_data",
        header: () => <span className="font-semibold">Data Baru</span>,
        cell: ({row}) => <JsonPreview value={row.getValue("new_data")} label="Data Baru" />,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
                {row.original.status === "SUCCESS" ? (
                    <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconAlertHexagonFilled className="fill-rose-600 dark:fill-rose-700" />
                )}
                {row.original.status}
            </Badge>
        ),
    },
];
