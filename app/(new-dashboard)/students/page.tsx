"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/students.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import {useStudents} from "@/hooks/use-students";
import {Student} from "@/lib/services/student";

export const studentsData: Student[] = [
    {
        id: 1,
        nama: "Ahmad Fauzan",
        nisn: "0056789123",
        nik: "3201121409080001",
        jenis_kelamin: "L",
        tanggal_lahir: "2009-08-14",
        alamat: "Jl. Melati No. 12",
        alamat_jalan: "Melati",
        jarak_rumah_ke_sekolah: 2.5,
        nama_ayah: "Slamet Riyadi",
        nama_ibu: "Siti Aminah",
        penghasilan_ayah: "3.000.000",
        pekerjaan_ayah: "Karyawan Swasta",
        pekerjaan_ibu: "Ibu Rumah Tangga",
        penerima_kip: true,
        layak_pip: true,
        status: "Aktif",
        jenis_pendaftaran_rombel: "Siswa Baru",
        sekolah_asal: "SD Negeri 01",
        jenis_keluar: "",
        tanggal_masuk: "2021-07-10",
        tanggal_keluar: "",
        validation_status: "verified",
        backbone_last_synced_at: null,
        created_at: "2025-01-12T10:22:00Z",
        updated_at: "2025-01-12T10:22:00Z",
    },
    {
        id: 2,
        nama: "Putri Lestari",
        nisn: "0043219876",
        nik: "3201121509090002",
        jenis_kelamin: "P",
        tanggal_lahir: "2009-09-15",
        alamat: "Jl. Kenanga No. 9",
        alamat_jalan: "Kenanga",
        jarak_rumah_ke_sekolah: 1.2,
        nama_ayah: "Budi Hartono",
        nama_ibu: "Mawar Kusuma",
        penghasilan_ayah: "5.000.000",
        pekerjaan_ayah: "Pegawai Negeri",
        pekerjaan_ibu: "Wiraswasta",
        penerima_kip: false,
        layak_pip: false,
        status: "Aktif",
        jenis_pendaftaran_rombel: "Pindahan",
        sekolah_asal: "SMP Swasta Harapan",
        jenis_keluar: "",
        tanggal_masuk: "2022-08-01",
        tanggal_keluar: "",
        validation_status: "pending",
        backbone_last_synced_at: "2025-01-10T09:00:00Z",
        created_at: "2025-01-10T09:00:00Z",
        updated_at: "2025-01-10T09:30:00Z",
    },
    {
        id: 3,
        nama: "Rama Wijaya",
        nisn: "0034567891",
        nik: "3201122007100003",
        jenis_kelamin: "L",
        tanggal_lahir: "2007-10-20",
        alamat: "Jl. Anggrek No. 5",
        alamat_jalan: "Anggrek",
        jarak_rumah_ke_sekolah: 4.8,
        nama_ayah: "Joko Susilo",
        nama_ibu: "Nurhayati",
        penghasilan_ayah: "2.500.000",
        pekerjaan_ayah: "Buruh",
        pekerjaan_ibu: "Ibu Rumah Tangga",
        penerima_kip: true,
        layak_pip: true,
        status: "Lulus",
        jenis_pendaftaran_rombel: "Siswa Baru",
        sekolah_asal: "SMP Negeri 2",
        jenis_keluar: "Lulus",
        tanggal_masuk: "2020-07-15",
        tanggal_keluar: "2023-05-20",
        validation_status: "verified",
        backbone_last_synced_at: null,
        created_at: "2025-01-05T08:45:00Z",
        updated_at: "2025-01-05T08:45:00Z",
    },
];

export default function StudentsPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: students, isLoading} = useStudents({
        status: "",
        layak_pip: true,
        penerima_kip: true,
        validation_status: "",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading || !students) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Data Peserta Didik</h1>
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
                data={students.data.length > 0 ? students.data : studentsData}
                searchableColumn="nama"
                manualPagination
                pageIndex={students.current_page - 1}
                serverPageSize={students.per_page}
                pageCount={students.last_page}
                totalItems={students.total}
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
