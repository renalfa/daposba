import {z} from "zod";

export const updateRombelSchema = z.object({
    nama_rombel: z.string().min(1, "Nama rombel wajib diisi"),
    tingkat_pendidikan: z.string().min(1, "Tingkat pendidikan wajib dipilih"),
    kurikulum: z.string().min(1, "Kurikulum wajib dipilih"),
    jenis_rombel: z.string().min(1, "Jenis rombel wajib dipilih"),

    ruang: z.string().optional().nullable(),

    ptk_id: z.number().optional().nullable(),
    nama_ptk: z.string().optional().nullable(),

    jumlah_siswa_laki: z.number().optional().nullable(),
    jumlah_siswa_perempuan: z.number().optional().nullable(),
    jumlah_anggota_rombel: z.number().optional().nullable(),

    tanggal_mulai: z.string().optional().nullable(), // YYYY-MM-DD
    tanggal_selesai: z.string().optional().nullable(), // YYYY-MM-DD
});

export type UpdateRombelFormValues = z.infer<typeof updateRombelSchema>;
