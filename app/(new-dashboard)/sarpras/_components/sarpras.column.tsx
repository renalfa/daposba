"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EllipsisVertical} from "lucide-react";
import Link from "next/link";
import {Sarpras} from "@/lib/services/sarpras";

export const columns: ColumnDef<Sarpras>[] = [
    {
        accessorKey: "nama",
        header: () => <span className="font-semibold">Nama</span>,
        cell: ({row}) => (
            <div className="flex flex-col text-xs">
                <span className="font-medium">{row.getValue("nama")}</span>
                <code className="text-xs bg-muted px-1 rounded">{row.original.kode_barang}</code>
            </div>
        ),
    },
    {
        accessorKey: "kategori",
        header: () => <span className="font-semibold">Kategori</span>,
    },
    {
        accessorKey: "kepemilikan",
        header: () => <span className="font-semibold">Kepemilikan</span>,
    },
    {
        accessorKey: "kondisi",
        header: () => <span className="font-semibold">Kondisi</span>,
        cell: ({row}) => <Badge variant="primary">{row.getValue("kondisi")}</Badge>,
    },
    {
        accessorKey: "jumlah_layak",
        header: () => <span className="font-semibold">Layak</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("jumlah_layak")}</code>,
    },
    {
        accessorKey: "jumlah_tidak_layak",
        header: () => <span className="font-semibold">Tidak Layak</span>,
        cell: ({row}) => <code className="text-xs bg-muted px-1 rounded">{row.getValue("jumlah_tidak_layak")}</code>,
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
    //                     <Link href={`/sarpras/${row.original.id}`}>Edit</Link>
    //                 </DropdownMenuItem>
    //             </DropdownMenuContent>
    //         </DropdownMenu>
    //     ),
    // },
];
