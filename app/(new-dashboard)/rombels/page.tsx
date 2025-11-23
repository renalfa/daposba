"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/rombels.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import {Rombel} from "@/lib/services/rombel";
import {useRombels} from "@/hooks/use-rombels";
import LoadingTable from "@/components/loading-table";

export const rombels: Rombel[] = [
    {
        id: 1,
        nama_rombel: "VII A",
        tingkat_pendidikan: "SMP",
        kurikulum: "Kurikulum Merdeka",
        jenis_rombel: "Reguler",
        ruang: "Ruang 01",
        ptk_id: 12,
        nama_ptk: "Andi Suryadi",
        jumlah_siswa_laki: 15,
        jumlah_siswa_perempuan: 18,
        jumlah_anggota_rombel: 33,
        tanggal_mulai: "2024-07-15",
        tanggal_selesai: null,
        validation_status: "verified",
        backbone_last_synced_at: "2025-01-10T09:30:00Z",
        created_at: "2025-01-10T09:30:00Z",
        updated_at: "2025-01-10T09:30:00Z",

        // tambahan opsional sesuai API umum rombel
        // semester_id: 20241,
        // wali_kelas: "Andi Suryadi",
        // status_rombel: "Aktif",
    },
    {
        id: 2,
        nama_rombel: "VIII B",
        tingkat_pendidikan: "SMP",
        kurikulum: "K13 Revisi",
        jenis_rombel: "Reguler",
        ruang: "Ruang 05",
        ptk_id: 18,
        nama_ptk: "Siti Rahmawati",
        jumlah_siswa_laki: 17,
        jumlah_siswa_perempuan: 16,
        jumlah_anggota_rombel: 33,
        tanggal_mulai: "2023-07-10",
        tanggal_selesai: null,
        validation_status: "pending",
        backbone_last_synced_at: null,
        created_at: "2024-08-01T08:00:00Z",
        updated_at: "2024-12-20T12:22:00Z",
    },
    {
        id: 3,
        nama_rombel: "IX C",
        tingkat_pendidikan: "SMP",
        kurikulum: "Kurikulum Merdeka",
        jenis_rombel: "Reguler",
        ruang: "Ruang 09",
        ptk_id: 20,
        nama_ptk: "Budi Santoso",
        jumlah_siswa_laki: 12,
        jumlah_siswa_perempuan: 14,
        jumlah_anggota_rombel: 26,
        tanggal_mulai: "2022-07-10",
        tanggal_selesai: "2025-01-01",
        validation_status: "verified",
        backbone_last_synced_at: null,
        created_at: "2022-07-10T07:00:00Z",
        updated_at: "2025-01-01T09:00:00Z",
    },
];

export default function RombelPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: rombel, isLoading} = useRombels({
        tingkat_pendidikan: "VII",
        validation_status: "verified_school",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading || !rombel) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Data Rombongan Belajar</h1>
                <div className="space-x-2">
                    <Button>
                        <CheckIcon /> Submit Data
                    </Button>
                    <Button>
                        <FolderSync /> Sync Data
                    </Button>
                </div>
            </div>
            <NewDataTable
                columns={columns}
                data={rombel.data}
                searchableColumn="nama_rombel"
                manualPagination
                pageIndex={rombel.current_page - 1}
                serverPageSize={rombel.per_page}
                pageCount={rombel.last_page}
                totalItems={rombel.total}
                onPageChange={(nextPageIndex) => {
                    setPageIndex(nextPageIndex);
                }}
                onPageSizeChange={(nextSize) => {
                    setPageSize(nextSize);
                    setPageIndex(0);
                }}
            />
        </div>
    );
}
