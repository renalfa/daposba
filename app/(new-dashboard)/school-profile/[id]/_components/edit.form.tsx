"use client";

import {useEffect} from "react";
import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useUpdateSchool} from "@/hooks/use-schools";

import {School} from "@/lib/services/school";
import {UpdateSchoolFormValues, updateSchoolSchema} from "@/lib/validators/school";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Textarea} from "@/components/ui/textarea";

type SchoolEditFormProps = {
    school: School;
    onSuccess?: () => void;
};

export function SchoolEditForm({school, onSuccess}: SchoolEditFormProps) {
    const form = useForm<UpdateSchoolFormValues>({
        resolver: zodResolver(updateSchoolSchema),
        defaultValues: {
            nama: school.nama ?? "",
            npsn: school.npsn ?? "",
            bentuk_pendidikan: school.bentuk_pendidikan ?? "",
            status_sekolah: school.status_sekolah ?? "",
            alamat_jalan: school.alamat_jalan ?? "",
            desa_kelurahan: school.desa_kelurahan ?? "",
            kecamatan: school.kecamatan ?? "",
            kabupaten: school.kabupaten ?? "",
            provinsi: school.provinsi ?? "",
            sk_pendirian_sekolah: school.sk_pendirian_sekolah ?? "",
            sk_izin_operasional: school.sk_izin_operasional ?? "",
            status_kepemilikan: school.status_kepemilikan ?? "",
            daya_listrik: school.daya_listrik ?? "",
            akses_internet: school.akses_internet ?? false,
            akreditasi: school.akreditasi ?? "",
            no_rekening: school.no_rekening ?? "",
            nama_bank: school.nama_bank ?? "",
            rekening_atas_nama: school.rekening_atas_nama ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            nama: school.nama ?? "",
            npsn: school.npsn ?? "",
            bentuk_pendidikan: school.bentuk_pendidikan ?? "",
            status_sekolah: school.status_sekolah ?? "",
            alamat_jalan: school.alamat_jalan ?? "",
            desa_kelurahan: school.desa_kelurahan ?? "",
            kecamatan: school.kecamatan ?? "",
            kabupaten: school.kabupaten ?? "",
            provinsi: school.provinsi ?? "",
            sk_pendirian_sekolah: school.sk_pendirian_sekolah ?? "",
            sk_izin_operasional: school.sk_izin_operasional ?? "",
            status_kepemilikan: school.status_kepemilikan ?? "",
            daya_listrik: school.daya_listrik ?? "",
            akses_internet: school.akses_internet ?? false,
            akreditasi: school.akreditasi ?? "",
            no_rekening: school.no_rekening ?? "",
            nama_bank: school.nama_bank ?? "",
            rekening_atas_nama: school.rekening_atas_nama ?? "",
        });
    }, [school, form]);

    const {mutate, isPending} = useUpdateSchool();

    const onSubmit = (values: UpdateSchoolFormValues) => {
        mutate(
            {id: school.id, data: values},
            {
                onSuccess: () => {
                    onSuccess?.();
                },
            }
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Identitas Sekolah */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Identitas Sekolah</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nama Sekolah</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama Sekolah" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="npsn"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>NPSN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="NPSN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bentuk_pendidikan"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Bentuk Pendidikan</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih bentuk pendidikan" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SD">SD</SelectItem>
                                            <SelectItem value="SMP">SMP</SelectItem>
                                            <SelectItem value="SMA">SMA</SelectItem>
                                            <SelectItem value="SMK">SMK</SelectItem>
                                            {/* tambah sesuai master data */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status_sekolah"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status Sekolah</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih status sekolah" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Negeri">Negeri</SelectItem>
                                            <SelectItem value="Swasta">Swasta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Alamat */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Alamat</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="alamat_jalan"
                            render={({field}) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Alamat Jalan</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Alamat jalan lengkap" rows={3} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="desa_kelurahan"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Desa / Kelurahan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Desa / Kelurahan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kecamatan"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Kecamatan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kecamatan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="kabupaten"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Kabupaten / Kota</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kabupaten / Kota" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="provinsi"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Provinsi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Provinsi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Legal & Kepemilikan */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Legal & Kepemilikan</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="sk_pendirian_sekolah"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>SK Pendirian Sekolah</FormLabel>
                                    <FormControl>
                                        <Input placeholder="No. SK Pendirian" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sk_izin_operasional"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>SK Izin Operasional</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="No. SK Izin Operasional"
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
                            name="status_kepemilikan"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status Kepemilikan</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih status kepemilikan" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Negeri">Negeri</SelectItem>
                                            <SelectItem value="Swasta">Swasta</SelectItem>
                                            {/* Sesuaikan dengan master */}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="akreditasi"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Akreditasi</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih akreditasi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="A">A</SelectItem>
                                            <SelectItem value="B">B</SelectItem>
                                            <SelectItem value="C">C</SelectItem>
                                            <SelectItem value="Belum Terakreditasi">Belum Terakreditasi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Sarpras & Infrastruktur */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Sarana Prasarana</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="daya_listrik"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Daya Listrik (VA)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            inputMode="numeric"
                                            placeholder="Contoh: 2200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="akses_internet"
                            render={({field}) => (
                                <FormItem className="flex items-center justify-between space-y-0 rounded-md border px-3 py-2">
                                    <div className="space-y-0.5">
                                        <FormLabel>Akses Internet</FormLabel>
                                        <p className="text-xs text-muted-foreground">
                                            Tandai jika sekolah memiliki akses internet aktif.
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Rekening Sekolah */}
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-sm font-semibold">Informasi Rekening</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="no_rekening"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>No. Rekening</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="No. rekening sekolah"
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
                            name="nama_bank"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nama Bank</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama bank" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rekening_atas_nama"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Rekening Atas Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Atas nama" {...field} value={field.value || ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    {/* Kalau mau ada tombol reset/cancel di sini */}
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
