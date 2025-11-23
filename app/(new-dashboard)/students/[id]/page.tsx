"use client";

import {useParams} from "next/navigation";
import {useStudent} from "@/hooks/use-students";
import {StudentEditForm} from "./_components/edit.form";
import {useRouter} from "next/navigation";

const student = {
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
};

export default function StudentDetailPage() {
    const router = useRouter();

    // TODO: Replace with useStudent not dummy
    // const params = useParams<{id: string}>();
    // const {data: student, isLoading, isError} = useStudent(params.id);

    // if (isLoading) return <div>Loading...</div>;
    // if (isError || !ptk) return <div>Gagal memuat data Student</div>;

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Data Peserta Didik</h1>

            <StudentEditForm
                student={student}
                onSuccess={() => {
                    router.push("/students");
                }}
            />
        </div>
    );
}
