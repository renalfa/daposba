"use client";

import {RombelEditForm} from "./_components/edit.form";
import {useRouter} from "next/navigation";

const rombels = {
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
};

export default function RombelDetailPage() {
    const router = useRouter();

    // TODO: Replace with useRombels not dummy
    // const params = useParams<{id: string}>();
    // const {data: rombel, isLoading, isError} = useRombels(params.id);

    // if (isLoading) return <div>Loading...</div>;
    // if (isError || !ptk) return <div>Gagal memuat data rombel</div>;

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Data Rombongan Belajar</h1>

            <RombelEditForm
                rombel={rombels}
                onSuccess={() => {
                    router.push("/rombels");
                }}
            />
        </div>
    );
}
