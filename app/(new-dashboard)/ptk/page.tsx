"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/ptk.column";
import {usePtk} from "@/hooks/use-ptk";
import {Ptk} from "@/lib/services/ptk";
import {CheckIcon, FolderSync} from "lucide-react";
import {Button} from "@/components/ui/button";

export const ptkData: Ptk[] = [
    {
        id: 1,
        nama: "Andi Suryadi",
        nip: "198901012010011001",
        nuptk: "123456789012",
        jenis_kelamin: "L",
        status_kepegawaian: "PNS",
        jenis_ptk: "Guru Mapel",
        tmt_pengangkatan: "2016-07-01",
        sumber_gaji: "APBD",
        pendidikan_terakhir: "S1",
        program_studi: "Matematika",
        riwayat_pendidikan_formal_jenjang_pendidikan: "S1 Pendidikan",
        riwayat_sertifikasi: "Sertifikasi Guru",
        tahun_sertifikasi: "2020",
        kode_kecamatan: "737101",
        kode_kabupaten: "7371",
        validation_status: "Valid",
        backbone_last_synced_at: "2023-08-01T10:00:00Z",
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2023-08-01T10:00:00Z",
    },
    {
        id: 2,
        nama: "Siti Rahmawati",
        nip: "199002052015032002",
        nuptk: "987654321098",
        jenis_kelamin: "P",
        status_kepegawaian: "Honorer",
        jenis_ptk: "Guru Kelas",
        tmt_pengangkatan: "2018-09-01",
        sumber_gaji: "Yayasan",
        pendidikan_terakhir: "S1",
        program_studi: "Bahasa Indonesia",
        riwayat_pendidikan_formal_jenjang_pendidikan: "S1 Pendidikan Bahasa",
        riwayat_sertifikasi: "Belum Sertifikasi",
        tahun_sertifikasi: "",
        kode_kecamatan: "737102",
        kode_kabupaten: "7371",
        validation_status: "Valid",
        backbone_last_synced_at: "2023-08-01T10:00:00Z",
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2023-08-01T10:00:00Z",
    },
    {
        id: 3,
        nama: "Budi Santoso",
        nip: "198705122009021003",
        nuptk: "567890123456",
        jenis_kelamin: "L",
        status_kepegawaian: "PNS",
        jenis_ptk: "Guru BK",
        tmt_pengangkatan: "2010-02-01",
        sumber_gaji: "APBN",
        pendidikan_terakhir: "S2",
        program_studi: "Psikologi Pendidikan",
        riwayat_pendidikan_formal_jenjang_pendidikan: "S2 Pendidikan",
        riwayat_sertifikasi: "Sertifikasi Guru",
        tahun_sertifikasi: "2017",
        kode_kecamatan: "737103",
        kode_kabupaten: "7371",
        validation_status: "Valid",
        backbone_last_synced_at: "2023-08-01T10:00:00Z",
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2023-08-01T10:00:00Z",
    },
];

export default function PtkPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: ptk, isLoading} = usePtk({
        status_kepegawaian: "",
        kode_kecamatan: "",
        validation_status: "",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading || !ptk) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Data Pendidik dan Tenaga Kependidikan</h1>
                <div className="space-x-2">
                    <Button>
                        <CheckIcon /> Submit Data
                    </Button>
                    <Button>
                        <FolderSync /> Sync Data
                    </Button>
                </div>
            </div>{" "}
            <NewDataTable
                columns={columns}
                data={ptk.data}
                searchableColumn="nama"
                manualPagination
                pageIndex={ptk.current_page - 1}
                serverPageSize={ptk.per_page}
                pageCount={ptk.last_page}
                totalItems={ptk.total}
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
