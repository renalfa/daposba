import {z} from "zod";

export const updateSchoolSchema = z.object({
    nama: z.string().min(1, "Nama sekolah wajib diisi"),
    npsn: z.string().min(1, "NPSN wajib diisi"),
    bentuk_pendidikan: z.string().min(1, "Bentuk pendidikan wajib dipilih"),
    status_sekolah: z.string().min(1, "Status sekolah wajib dipilih"),
    alamat_jalan: z.string().min(1, "Alamat jalan wajib diisi"),
    desa_kelurahan: z.string().min(1, "Desa / Kelurahan wajib diisi"),
    kecamatan: z.string().min(1, "Kecamatan wajib diisi"),
    kabupaten: z.string().min(1, "Kabupaten / Kota wajib diisi"),
    provinsi: z.string().min(1, "Provinsi wajib diisi"),
    sk_pendirian_sekolah: z.string().optional().nullable(),
    sk_izin_operasional: z.string().optional().nullable(),
    status_kepemilikan: z.string().min(1, "Status kepemilikan wajib dipilih"),
    daya_listrik: z.string().min(1, "Daya listrik wajib diisi").regex(/^\d+$/, "Daya listrik harus berupa angka"),
    akses_internet: z.boolean(),
    akreditasi: z.string().min(1, "Akreditasi wajib dipilih"),
    no_rekening: z.string().optional().nullable(),
    nama_bank: z.string().optional().nullable(),
    rekening_atas_nama: z.string().optional().nullable(),
});

export type UpdateSchoolFormValues = z.infer<typeof updateSchoolSchema>;
