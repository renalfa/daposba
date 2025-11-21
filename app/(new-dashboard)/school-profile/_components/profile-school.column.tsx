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
import {School} from "@/lib/services/school";
import Link from "next/link";

export const columns: ColumnDef<School>[] = [
    {
        accessorKey: "nama",
        header: () => <span className="font-semibold">Nama Sekolah</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-1">
                <span className="font-medium">
                    {row.getValue("nama")} <Badge variant="primary">{row.original.akreditasi}</Badge>
                </span>
                <span className="text-xs font-light text-muted-foreground">
                    {row.original.alamat_jalan} {row.original.desa_kelurahan}, {row.original.kecamatan},{" "}
                    {row.original.kabupaten}, {row.original.provinsi}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "npsn",
        header: () => <span className="font-semibold">NPSN</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("npsn")}</code>,
    },
    {
        accessorKey: "status_sekolah",
        header: () => <span className="font-semibold">Status</span>,
    },
    {
        accessorKey: "bentuk_pendidikan",
        header: () => <span className="font-semibold">Bentuk</span>,
        cell: ({row}) => (
            <Badge variant="primary" className="uppercase">
                {row.getValue("bentuk_pendidikan")}
            </Badge>
        ),
    },
    {
        accessorKey: "sk_pendirian_sekolah",
        header: () => <span className="font-semibold">Surat Keputusan</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-1">
                <span className="font-medium">
                    Pendirian:{" "}
                    <code className="text-xs bg-muted px-1 rounded">{row.getValue("sk_pendirian_sekolah")}</code>
                </span>
                <span className="font-medium">
                    Izin Operasional:{" "}
                    <code className="text-xs bg-muted px-1 rounded">{row.original.sk_pendirian_sekolah}</code>
                </span>
            </div>
        ),
    },
    {
        accessorKey: "nama_bank",
        header: () => <span className="font-semibold">Rekening</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-1">
                <span className="font-medium">{row.getValue("nama_bank")}</span>
                <code className="text-xs bg-muted px-1 rounded w-fit">{row.original.no_rekening}</code>
                <span className="text-xs font-light text-muted-foreground">{row.original.rekening_atas_nama}</span>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({row}) => (
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
                    <DropdownMenuItem asChild>
                        <Link href={`/school-profile/${row.original.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
