"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";
import Link from "next/link";
import {Student} from "@/lib/services/student";
import {formatDateOnly, formatRupiah} from "@/lib/utils";

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "nama",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col gap-0.5">
                <span className="font-medium">
                    {row.getValue("nama")}{" "}
                    <code className="bg-muted px-1 rounded font-normal text-xs">{row.original.jenis_kelamin}</code>
                </span>
                <span className="font-bold text-xs">
                    NIK: <code className="bg-muted px-1 rounded font-normal">{row.original.nik}</code>
                </span>
                <span className="text-xs font-light text-muted-foreground">
                    {row.original.alamat}{" "}
                    <code className="bg-muted px-1 rounded font-normal">{row.original.jarak_rumah_ke_sekolah} Km</code>
                </span>
            </div>
        ),
    },
    {
        accessorKey: "nisn",
        header: () => <span className="font-semibold">NISN</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("nisn")}</code>,
    },
    {
        accessorKey: "sekolah_asal",
        header: () => <span className="font-semibold">Sekolah</span>,
        cell: ({row}) => (
            <div className="flex flex-col">
                <span className="font-medium">{row.getValue("sekolah_asal")}</span>
                <span className="text-xs text-muted-foreground">Rombel: {row.original.jenis_pendaftaran_rombel}</span>
                <span className="text-xs text-muted-foreground">
                    Masuk: {formatDateOnly(row.original.tanggal_masuk as string)}
                </span>
                <span className="text-xs text-muted-foreground">
                    Keluar: {formatDateOnly(row.original.tanggal_keluar as string)}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <span className="font-semibold">Status</span>,
        cell: ({row}) => (
            <Badge variant="primary" className="uppercase">
                {row.getValue("status")}
            </Badge>
        ),
    },
    {
        accessorKey: "nama_ayah",
        header: () => <span className="font-semibold">Ayah</span>,
        cell: ({row}) => (
            <div className="flex flex-col text-xs gap-0.5">
                <span className="font-medium">{row.getValue("nama_ayah")}</span>
                <span className="text-xs text-muted-foreground">{row.original.pekerjaan_ayah}</span>
                <code className="text-xs bg-muted px-1 rounded w-fit">
                    {formatRupiah(row.original.penghasilan_ayah)}
                </code>
            </div>
        ),
    },
    {
        accessorKey: "nama_ibu",
        header: () => <span className="font-semibold">Ibu</span>,
        cell: ({row}) => (
            <div className="flex flex-col text-xs gap-0.5">
                <span className="font-medium">{row.getValue("nama_ibu")}</span>
                <span className="text-xs text-muted-foreground">{row.original.pekerjaan_ibu}</span>
            </div>
        ),
    },
    {
        accessorKey: "penerima_kip",
        header: () => <span className="font-semibold">Penerima KIP</span>,
        cell: ({row}) => (
            <Badge variant={row.getValue("penerima_kip") ? "primary" : "secondary"}>
                {row.getValue("penerima_kip") ? "Ya" : "Tidak"}
            </Badge>
        ),
    },
    {
        accessorKey: "layak_pip",
        header: () => <span className="font-semibold">Layak PIP</span>,
        cell: ({row}) => (
            <Badge variant={row.getValue("layak_pip") ? "primary" : "secondary"}>
                {row.getValue("penerima_kip") ? "Layak" : "Tidak"}
            </Badge>
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
                        <Link href={`/students/${row.original.id}`}>Edit</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
