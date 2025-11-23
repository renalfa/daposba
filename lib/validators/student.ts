import {z} from "zod";

export const updateStudentSchema = z.object({
    nama: z.string().min(1, "Nama siswa wajib diisi"),
    nisn: z.string().optional().nullable(),
    nik: z.string().optional().nullable(),

    jenis_kelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
    tanggal_lahir: z.string().optional().nullable(),

    alamat: z.string().optional().nullable(),
    alamat_jalan: z.string().optional().nullable(),
    jarak_rumah_ke_sekolah: z.number().optional().nullable(),

    nama_ayah: z.string().optional().nullable(),
    nama_ibu: z.string().optional().nullable(),
    penghasilan_ayah: z.string().optional().nullable(),
    pekerjaan_ayah: z.string().optional().nullable(),
    pekerjaan_ibu: z.string().optional().nullable(),

    penerima_kip: z.boolean().nullable().optional(),
    layak_pip: z.boolean().nullable().optional(),

    status: z.string().optional().nullable(),
    jenis_pendaftaran_rombel: z.string().optional().nullable(),
    sekolah_asal: z.string().optional().nullable(),
    jenis_keluar: z.string().optional().nullable(),
    tanggal_masuk: z.string().optional().nullable(),
    tanggal_keluar: z.string().optional().nullable(),
});

export type UpdateStudentFormValues = z.infer<typeof updateStudentSchema>;
