"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Student} from "@/lib/services/student";
import {useUpdateStudent} from "@/hooks/use-students";
import {updateStudentSchema, type UpdateStudentFormValues} from "@/lib/validators/student";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type StudentEditFormProps = {
    student: Student;
    onSuccess?: () => void;
};

export function StudentEditForm({student, onSuccess}: StudentEditFormProps) {
    const form = useForm<UpdateStudentFormValues>({
        resolver: zodResolver(updateStudentSchema),
        defaultValues: {
            nama: student.nama ?? "",
            nisn: student.nisn ?? "",
            nik: student.nik ?? "",
            jenis_kelamin: student.jenis_kelamin ?? "",
            tanggal_lahir: student.tanggal_lahir ?? "",
            alamat: student.alamat ?? "",
            alamat_jalan: student.alamat_jalan ?? "",
            jarak_rumah_ke_sekolah: student.jarak_rumah_ke_sekolah ?? null,
            nama_ayah: student.nama_ayah ?? "",
            nama_ibu: student.nama_ibu ?? "",
            penghasilan_ayah: student.penghasilan_ayah ?? "",
            pekerjaan_ayah: student.pekerjaan_ayah ?? "",
            pekerjaan_ibu: student.pekerjaan_ibu ?? "",
            penerima_kip: student.penerima_kip ?? null,
            layak_pip: student.layak_pip ?? null,
            status: student.status ?? "",
            jenis_pendaftaran_rombel: student.jenis_pendaftaran_rombel ?? "",
            sekolah_asal: student.sekolah_asal ?? "",
            jenis_keluar: student.jenis_keluar ?? "",
            tanggal_masuk: student.tanggal_masuk ?? "",
            tanggal_keluar: student.tanggal_keluar ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            nama: student.nama ?? "",
            nisn: student.nisn ?? "",
            nik: student.nik ?? "",
            jenis_kelamin: student.jenis_kelamin ?? "",
            tanggal_lahir: student.tanggal_lahir ?? "",
            alamat: student.alamat ?? "",
            alamat_jalan: student.alamat_jalan ?? "",
            jarak_rumah_ke_sekolah: student.jarak_rumah_ke_sekolah ?? null,
            nama_ayah: student.nama_ayah ?? "",
            nama_ibu: student.nama_ibu ?? "",
            penghasilan_ayah: student.penghasilan_ayah ?? "",
            pekerjaan_ayah: student.pekerjaan_ayah ?? "",
            pekerjaan_ibu: student.pekerjaan_ibu ?? "",
            penerima_kip: student.penerima_kip ?? null,
            layak_pip: student.layak_pip ?? null,
            status: student.status ?? "",
            jenis_pendaftaran_rombel: student.jenis_pendaftaran_rombel ?? "",
            sekolah_asal: student.sekolah_asal ?? "",
            jenis_keluar: student.jenis_keluar ?? "",
            tanggal_masuk: student.tanggal_masuk ?? "",
            tanggal_keluar: student.tanggal_keluar ?? "",
        });
    }, [student, form]);

    const {mutate, isPending} = useUpdateStudent();

    const onSubmit = (values: UpdateStudentFormValues) => {
        mutate(
            {id: student.id, data: values},
            {
                onSuccess: () => {
                    onSuccess?.();
                },
            }
        );
    };

    return (
        <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle>Form Edit Peserta Didik</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        {/* Identitas Siswa */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Identitas Peserta Didik</h3>
                                <p className="text-xs text-muted-foreground">Berikut adalah identitas peserta didik.</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="nama"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama Siswa</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama lengkap siswa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jenis_kelamin"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jenis Kelamin</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="nisn"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>NISN</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="NISN (jika ada)"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="nik"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>NIK</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="NIK (jika ada)"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tanggal_lahir"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Lahir</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    value={field.value ?? ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Alamat */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Alamat</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi alamat peserta didik.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="alamat_jalan"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Alamat Jalan</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Alamat jalan lengkap"
                                                    rows={3}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="alamat"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Alamat Tambahan (opsional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="RT/RW, Dusun, dsb (opsional)"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jarak_rumah_ke_sekolah"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jarak Rumah ke Sekolah (km)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="decimal"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="Contoh: 2.5"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Orang Tua */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Orang Tua</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi orang tua peserta didik.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="nama_ayah"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama Ayah</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama ayah" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="nama_ibu"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama Ibu</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama ibu" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pekerjaan_ayah"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Pekerjaan Ayah</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Pekerjaan ayah"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pekerjaan_ibu"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Pekerjaan Ibu</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Pekerjaan ibu"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="penghasilan_ayah"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Penghasilan Ayah (range / keterangan)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: < 1 juta, 1-3 juta, dsb."
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Bantuan / Beasiswa */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Bantuan & Beasiswa</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi terkait bantuan/beasiswa peserta didik
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="penerima_kip"
                                    render={({field}) => (
                                        <FormItem className="flex items-center justify-between space-y-0 rounded-md border px-3 py-2">
                                            <div className="space-y-0.5">
                                                <FormLabel>Penerima KIP</FormLabel>
                                                <p className="text-xs text-muted-foreground">
                                                    Tandai jika siswa terdaftar sebagai penerima KIP.
                                                </p>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={!!field.value}
                                                    onCheckedChange={(val) => field.onChange(val)}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="layak_pip"
                                    render={({field}) => (
                                        <FormItem className="flex items-center justify-between space-y-0 rounded-md border px-3 py-2">
                                            <div className="space-y-0.5">
                                                <FormLabel>Layak PIP</FormLabel>
                                                <p className="text-xs text-muted-foreground">
                                                    Tandai jika siswa dinilai layak mendapatkan PIP.
                                                </p>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={!!field.value}
                                                    onCheckedChange={(val) => field.onChange(val)}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Status & Riwayat Sekolah */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Status & Riwayat Sekolah</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi status dan riwayat sekolah peserta didik.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value ?? ""}
                                                defaultValue={field.value ?? ""}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih status siswa" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="aktif">Aktif</SelectItem>
                                                    <SelectItem value="lulus">Lulus</SelectItem>
                                                    <SelectItem value="mutasi">Mutasi</SelectItem>
                                                    <SelectItem value="keluar">Keluar</SelectItem>
                                                    {/* sesuaikan dengan enum-mu */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sekolah_asal"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sekolah Asal</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nama sekolah asal (jika ada)"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jenis_pendaftaran_rombel"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jenis Pendaftaran Rombel</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: Siswa Baru, Pindahan, dsb."
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jenis_keluar"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jenis Keluar</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: Lulus, Pindah, Dikeluarkan, dsb."
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tanggal_masuk"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Masuk</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    value={field.value ?? ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tanggal_keluar"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Keluar</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    value={field.value ?? ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}
