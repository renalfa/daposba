"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Ptk} from "@/lib/services/ptk";
import {useUpdatePtk} from "@/hooks/use-ptk";
import {updatePtkSchema, type UpdatePtkFormValues} from "@/lib/validators/ptk";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type PtkEditFormProps = {
    ptk: Ptk;
    onSuccess?: () => void;
};

export function PtkEditForm({ptk, onSuccess}: PtkEditFormProps) {
    const form = useForm<UpdatePtkFormValues>({
        resolver: zodResolver(updatePtkSchema),
        defaultValues: {
            nama: ptk.nama ?? "",
            nip: ptk.nip ?? "",
            nuptk: ptk.nuptk ?? "",
            jenis_kelamin: ptk.jenis_kelamin ?? "",
            status_kepegawaian: ptk.status_kepegawaian ?? "",
            jenis_ptk: ptk.jenis_ptk ?? "",
            tmt_pengangkatan: ptk.tmt_pengangkatan ?? "",
            sumber_gaji: ptk.sumber_gaji ?? "",
            pendidikan_terakhir: ptk.pendidikan_terakhir ?? "",
            program_studi: ptk.program_studi ?? "",
            riwayat_pendidikan_formal_jenjang_pendidikan: ptk.riwayat_pendidikan_formal_jenjang_pendidikan ?? "",
            riwayat_sertifikasi: ptk.riwayat_sertifikasi ?? "",
            tahun_sertifikasi: ptk.tahun_sertifikasi ?? "",
            kode_kecamatan: ptk.kode_kecamatan ?? "",
            kode_kabupaten: ptk.kode_kabupaten ?? "",
        },
    });

    // sync kalau data PTK berubah
    useEffect(() => {
        form.reset({
            nama: ptk.nama ?? "",
            nip: ptk.nip ?? "",
            nuptk: ptk.nuptk ?? "",
            jenis_kelamin: ptk.jenis_kelamin ?? "",
            status_kepegawaian: ptk.status_kepegawaian ?? "",
            jenis_ptk: ptk.jenis_ptk ?? "",
            tmt_pengangkatan: ptk.tmt_pengangkatan ?? "",
            sumber_gaji: ptk.sumber_gaji ?? "",
            pendidikan_terakhir: ptk.pendidikan_terakhir ?? "",
            program_studi: ptk.program_studi ?? "",
            riwayat_pendidikan_formal_jenjang_pendidikan: ptk.riwayat_pendidikan_formal_jenjang_pendidikan ?? "",
            riwayat_sertifikasi: ptk.riwayat_sertifikasi ?? "",
            tahun_sertifikasi: ptk.tahun_sertifikasi ?? "",
            kode_kecamatan: ptk.kode_kecamatan ?? "",
            kode_kabupaten: ptk.kode_kabupaten ?? "",
        });
    }, [ptk, form]);

    const {mutate, isPending} = useUpdatePtk();

    const onSubmit = (values: UpdatePtkFormValues) => {
        mutate(
            {id: ptk.id, data: values},
            {
                onSuccess: () => {
                    onSuccess?.(); // misal close drawer/modal
                },
            }
        );
    };

    return (
        <Form {...form}>
            <Card>
                <CardHeader>
                    <CardTitle>Form Edit Sekolah</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        {/* Identitas PTK */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Identitas PTK</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah data identitas Pendidik dan Tenaga Pendidikan
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="nama"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama PTK</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nama lengkap PTK" {...field} />
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
                                    name="nip"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>NIP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="NIP (jika ada)"
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
                                    name="nuptk"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>NUPTK</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="NUPTK (jika ada)"
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

                        {/* Kepegawaian */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Data Kepegawaian</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah data kepegawaian Pendidik dan Tenaga Pendidikan
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="status_kepegawaian"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status Kepegawaian</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih status kepegawaian" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PNS">PNS</SelectItem>
                                                    <SelectItem value="PPPK">PPPK</SelectItem>
                                                    <SelectItem value="Honorer">Honorer</SelectItem>
                                                    <SelectItem value="GTY/PTY">GTY/PTY</SelectItem>
                                                    {/* sesuaikan dengan master di API kalau ada */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jenis_ptk"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jenis PTK</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih jenis PTK" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Guru Kelas">Guru Kelas</SelectItem>
                                                    <SelectItem value="Guru Mapel">Guru Mapel</SelectItem>
                                                    <SelectItem value="Kepala Sekolah">Kepala Sekolah</SelectItem>
                                                    <SelectItem value="Tenaga Administrasi Sekolah">
                                                        Tenaga Administrasi Sekolah
                                                    </SelectItem>
                                                    {/* sesuaikan dengan master */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tmt_pengangkatan"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>TMT Pengangkatan</FormLabel>
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
                                    name="sumber_gaji"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Sumber Gaji</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="APBD, APBN, Yayasan, dll."
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

                        {/* Pendidikan & Sertifikasi */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Pendidikan & Sertifikasi</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah data pendidikan dan sertifikasi Pendidik dan Tenaga Pendidikan
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="pendidikan_terakhir"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Pendidikan Terakhir</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ""}
                                                defaultValue={field.value || ""}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih pendidikan terakhir" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                                                    <SelectItem value="D1">D1</SelectItem>
                                                    <SelectItem value="D2">D2</SelectItem>
                                                    <SelectItem value="D3">D3</SelectItem>
                                                    <SelectItem value="S1">S1</SelectItem>
                                                    <SelectItem value="S2">S2</SelectItem>
                                                    <SelectItem value="S3">S3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="program_studi"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Program Studi</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: Pendidikan Matematika"
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
                                    name="riwayat_pendidikan_formal_jenjang_pendidikan"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Riwayat Pendidikan Formal</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Riwayat pendidikan formal yang pernah ditempuh"
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
                                    name="riwayat_sertifikasi"
                                    render={({field}) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Riwayat Sertifikasi</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Sertifikasi yang pernah diikuti"
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
                                    name="tahun_sertifikasi"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tahun Sertifikasi</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: 2020"
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

                        {/* Lokasi (kode wilayah) */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Kode Wilayah</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah data wilayah Pendidik dan Tenaga Pendidikan
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="kode_kecamatan"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Kode Kecamatan</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Kode kecamatan (opsional)"
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
                                    name="kode_kabupaten"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Kode Kabupaten</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Kode kabupaten (opsional)"
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
