"use client";

import {useParams} from "next/navigation";
import {usePtkById} from "@/hooks/use-ptk";
import {PtkEditForm} from "./_components/edit.form";
import {useRouter} from "next/navigation";

const ptk = {
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
};

export default function PtkDetailPage() {
    const router = useRouter();

    // TODO: Replace with usePtkById not dummy
    // const params = useParams<{id: string}>();
    // const {data: ptk, isLoading, isError} = usePtkById(params.id);

    // if (isLoading) return <div>Loading...</div>;
    // if (isError || !ptk) return <div>Gagal memuat data PTK</div>;

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Data Pendidik dan Tenaga Kependidikan</h1>

            <PtkEditForm
                ptk={ptk}
                onSuccess={() => {
                    router.push("/school-profile");
                }}
            />
        </div>
    );
}
