import {apiPrivate} from "./api";
import type {UpdateSchoolFormValues} from "@/lib/validators/school";

export type UpdateSchoolInput = UpdateSchoolFormValues;

export type School = {
    id: number;
    backbone_id: string;
    nama: string;
    npsn: string;
    bentuk_pendidikan: string;
    status_sekolah: string;
    alamat_jalan: string;
    desa_kelurahan: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    sk_pendirian_sekolah: string;
    sk_izin_operasional: string;
    status_kepemilikan: string;
    daya_listrik: string;
    akses_internet: boolean;
    akreditasi: string;
    no_rekening: string;
    nama_bank: string;
    rekening_atas_nama: string;
    validation_status: string;
    backbone_last_synced_at: string | null;
    created_at: string;
    updated_at: string;
};

export type SchoolListResponse = {
    current_page: number;
    data: School[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

export type ListSchoolsParams = {
    kecamatan?: string;
    validation_status?: string;
    page?: number;
    per_page?: number;
};

export async function listSchools(params: ListSchoolsParams = {}): Promise<SchoolListResponse> {
    const searchParams = new URLSearchParams();

    if (params.kecamatan) {
        searchParams.append("kecamatan", params.kecamatan);
    }

    if (params.validation_status) {
        searchParams.append("validation_status", params.validation_status);
    }

    if (params.page) {
        searchParams.append("page", String(params.page));
    }

    if (params.per_page) {
        searchParams.append("per_page", String(params.per_page));
    }

    return apiPrivate
        .get("schools", {
            searchParams,
        })
        .json<SchoolListResponse>();
}

export async function getSchoolById(studentId: number | string): Promise<School> {
    return apiPrivate.get(`schools/${studentId}`).json<School>();
}

export async function verifySchool(schoolId: number | string): Promise<School> {
    return apiPrivate.post(`schools/${schoolId}/verify`).json<School>();
}

export async function approveSchool(schoolId: number | string): Promise<School> {
    return apiPrivate.post(`schools/${schoolId}/approve`).json<School>();
}

export async function updateSchool(schoolId: number | string, payload: UpdateSchoolInput): Promise<School> {
    return apiPrivate
        .put(`schools/${schoolId}`, {
            json: payload,
        })
        .json<School>();
}
