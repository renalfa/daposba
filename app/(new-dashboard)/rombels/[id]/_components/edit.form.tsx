"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Rombel} from "@/lib/services/rombel";
import {useUpdateRombel} from "@/hooks/use-rombels";
import {updateRombelSchema, type UpdateRombelFormValues} from "@/lib/validators/rombel";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type RombelEditFormProps = {
    rombel: Rombel;
    onSuccess?: () => void;
};

export function RombelEditForm({rombel, onSuccess}: RombelEditFormProps) {
    const form = useForm<UpdateRombelFormValues>({
        resolver: zodResolver(updateRombelSchema),
        defaultValues: {
            nama_rombel: rombel.nama_rombel ?? "",
            tingkat_pendidikan: rombel.tingkat_pendidikan ?? "",
            kurikulum: rombel.kurikulum ?? "",
            jenis_rombel: rombel.jenis_rombel ?? "",
            ruang: rombel.ruang ?? "",
            ptk_id: rombel.ptk_id ?? null,
            jumlah_siswa_laki: rombel.jumlah_siswa_laki ?? null,
            jumlah_siswa_perempuan: rombel.jumlah_siswa_perempuan ?? null,
            jumlah_anggota_rombel: rombel.jumlah_anggota_rombel ?? null,
            tanggal_mulai: rombel.tanggal_mulai ?? "",
            tanggal_selesai: rombel.tanggal_selesai ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            nama_rombel: rombel.nama_rombel ?? "",
            tingkat_pendidikan: rombel.tingkat_pendidikan ?? "",
            kurikulum: rombel.kurikulum ?? "",
            jenis_rombel: rombel.jenis_rombel ?? "",
            ruang: rombel.ruang ?? "",
            ptk_id: rombel.ptk_id ?? null,
            jumlah_siswa_laki: rombel.jumlah_siswa_laki ?? null,
            jumlah_siswa_perempuan: rombel.jumlah_siswa_perempuan ?? null,
            jumlah_anggota_rombel: rombel.jumlah_anggota_rombel ?? null,
            tanggal_mulai: rombel.tanggal_mulai ?? "",
            tanggal_selesai: rombel.tanggal_selesai ?? "",
        });
    }, [rombel, form]);

    const {mutate, isPending} = useUpdateRombel();

    const onSubmit = (values: UpdateRombelFormValues) => {
        mutate(
            {id: rombel.id, data: values},
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Informasi Rombel */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Informasi Rombel</h3>
                                <p className="text-xs text-muted-foreground">Informasi umum tentang rombel</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="nama_rombel"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama Rombel</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contoh: VII A / X IPA 1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tingkat_pendidikan"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tingkat Pendidikan</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih tingkat" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="SD">SD</SelectItem>
                                                    <SelectItem value="SMP">SMP</SelectItem>
                                                    <SelectItem value="SMA">SMA</SelectItem>
                                                    <SelectItem value="SMK">SMK</SelectItem>
                                                    {/* sesuaikan dengan master */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="kurikulum"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Kurikulum</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Kurikulum 13 Revisi"
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
                                    name="jenis_rombel"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jenis Rombel</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih jenis rombel" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Reguler">Reguler</SelectItem>
                                                    <SelectItem value="Khusus">Khusus</SelectItem>
                                                    {/* dsb, sesuaikan */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ruang"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ruang</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contoh: Ruang 1 / Lab IPA"
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

                        {/* Wali Kelas / PTK */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Wali Kelas / PTK</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi terkait Wali Kelas/PTK pada Rombel
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 col-span-12 lg:col-span-9">
                                {/* Kalau kamu punya data PTK list, bisa ganti jadi Select dinamis */}
                                <FormField
                                    control={form.control}
                                    name="ptk_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>ID PTK (Wali Kelas)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="Masukkan ID PTK atau pilih dari dropdown di versi lanjutan"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {rombel.nama_ptk && (
                                    <div className="text-sm text-muted-foreground self-end">
                                        Wali kelas saat ini: <span className="font-medium">{rombel.nama_ptk}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Anggota & Periode */}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-3">
                                <h3 className="text-sm font-semibold">Siswa & Periode</h3>
                                <p className="text-xs text-muted-foreground">
                                    Berikut adalah informasi terkait Siswa dan Periode pada Rombel
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3 col-span-12 lg:col-span-9">
                                <FormField
                                    control={form.control}
                                    name="jumlah_siswa_laki"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jumlah Siswa Laki-laki</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="0"
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jumlah_siswa_perempuan"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jumlah Siswa Perempuan</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="0"
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="jumlah_anggota_rombel"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Total Anggota Rombel</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    placeholder="0"
                                                    disabled
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tanggal_mulai"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Mulai</FormLabel>
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
                                    name="tanggal_selesai"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tanggal Selesai</FormLabel>
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
