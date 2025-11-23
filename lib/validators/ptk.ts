import {z} from "zod";

export const updatePtkSchema = z.object({
    nama: z.string().min(1, "Nama PTK wajib diisi"),
    nip: z.string().optional().nullable(),
    nuptk: z.string().optional().nullable(),
    jenis_kelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
    status_kepegawaian: z.string().min(1, "Status kepegawaian wajib dipilih"),
    jenis_ptk: z.string().min(1, "Jenis PTK wajib dipilih"),
    tmt_pengangkatan: z.string().optional().nullable(),
    sumber_gaji: z.string().optional().nullable(),
    pendidikan_terakhir: z.string().optional().nullable(),
    program_studi: z.string().optional().nullable(),
    riwayat_pendidikan_formal_jenjang_pendidikan: z.string().optional().nullable(),
    riwayat_sertifikasi: z.string().optional().nullable(),
    tahun_sertifikasi: z.string().optional().nullable(),
    kode_kecamatan: z.string().optional().nullable(),
    kode_kabupaten: z.string().optional().nullable(),
});

export type UpdatePtkFormValues = z.infer<typeof updatePtkSchema>;
