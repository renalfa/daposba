"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";
import Link from "next/link";
import {Ptk} from "@/lib/services/ptk";

export const columns: ColumnDef<Ptk>[] = [
    {
        accessorKey: "nama",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-1">
                <span className="font-medium">{row.getValue("nama")}</span>
                <span className="text-xs font-light text-muted-foreground">
                    <Badge variant="primary">{row.original.status_kepegawaian}</Badge>{" "}
                    <Badge variant="secondary">
                        {row.original.pendidikan_terakhir} {row.original.program_studi}
                    </Badge>
                </span>
            </div>
        ),
    },
    {
        accessorKey: "nip",
        header: () => <span className="font-semibold">NIP</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nip")}</code>,
    },
    {
        accessorKey: "nuptk",
        header: () => <span className="font-semibold">NUPTK</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nuptk")}</code>,
    },
    {
        accessorKey: "jenis_ptk",
        header: () => <span className="font-semibold">Jenis PTK</span>,
    },
    {
        accessorKey: "riwayat_pendidikan_formal_jenjang_pendidikan",
        header: () => <span className="font-semibold">Riwayat</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-1">
                <span className="font-medium">
                    Pendidikan:{" "}
                    <code className="text-xs bg-muted px-1 rounded">
                        {row.getValue("riwayat_pendidikan_formal_jenjang_pendidikan")}
                    </code>
                </span>
                <span className="font-medium">
                    Sertifikasi:{" "}
                    <code className="text-xs bg-muted px-1 rounded">{row.original.riwayat_sertifikasi} {row.original.tahun_sertifikasi}</code>
                </span>
            </div>
        ),
    },
        {
        accessorKey: "sumber_gaji",
        header: () => <span className="font-semibold">Sumber Gaji</span>,
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
                        <Link href={`/ptk/${row.original.id}`}>Edit</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
