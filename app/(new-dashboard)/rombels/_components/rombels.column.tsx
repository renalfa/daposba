"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";
import Link from "next/link";
import {Rombel} from "@/lib/services/rombel";
import {formatDateOnly} from "@/lib/utils";

export const columns: ColumnDef<Rombel>[] = [
    {
        accessorKey: "nama_rombel",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-0.5">
                <span className="font-medium">
                    {row.original.tingkat_pendidikan} - {row.getValue("nama_rombel")}{" "}
                </span>
                <span className="text-xs font-light text-muted-foreground">
                    <Badge variant="primary">{row.original.jenis_rombel}</Badge> - {row.original.ruang}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "kurikulum",
        header: () => <span className="font-semibold">Kurikulum</span>,
    },
    {
        accessorKey: "nama_ptk",
        header: () => <span className="font-semibold">Nama PTK</span>,
    },
    {
        accessorKey: "jumlah_anggota_rombel",
        header: () => <span className="font-semibold">Siswa</span>,
        cell: ({row}) => (
            <div className="flex flex-col text-xs">
                <span>Laki-laki: <code className="text-xs bg-muted px-1 rounded">{row.original.jumlah_siswa_laki}</code></span>
                <span>Perempuan: <code className="text-xs bg-muted px-1 rounded">{row.original.jumlah_siswa_perempuan}</code></span>
                <span className="font-medium">Total: <code className="text-xs bg-muted px-1 rounded">{row.getValue("jumlah_anggota_rombel")}</code></span>
            </div>
        ),
    },
    {
        accessorKey: "tanggal_mulai",
        header: () => <span className="font-semibold">Tanggal Mulai</span>,
        cell: ({row}) => <span>{formatDateOnly(row.getValue("tanggal_mulai"))}</span>,
    },
    {
        accessorKey: "tanggal_selesai",
        header: () => <span className="font-semibold">Tanggal Selesai</span>,
        cell: ({row}) => <span>{formatDateOnly(row.getValue("tanggal_selesai"))}</span>,
    },
    // {
    //     id: "actions",
    //     cell: ({row}) => (
    //         <DropdownMenu>
    //             <DropdownMenuTrigger asChild>
    //                 <Button
    //                     variant="ghost"
    //                     className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
    //                     size="icon">
    //                     <EllipsisVertical />
    //                     <span className="sr-only">Open menu</span>
    //                 </Button>
    //             </DropdownMenuTrigger>
    //             <DropdownMenuContent align="end" className="w-32">
    //                 <DropdownMenuItem asChild>
    //                     <Link href={`/rombels/${row.original.id}`}>Edit</Link>
    //                 </DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     ),
    // },
];
