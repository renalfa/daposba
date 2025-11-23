import {apiPrivate} from "./api";
import type {UpdatePtkFormValues} from "@/lib/validators/ptk";

export type UpdatePtkInput = UpdatePtkFormValues;

export type Ptk = {
    id: number;
    nama: string;
    nip?: string;
    nuptk?: string;
    jenis_kelamin?: string;
    status_kepegawaian?: string;
    jenis_ptk?: string;
    tmt_pengangkatan?: string;
    sumber_gaji?: string;
    pendidikan_terakhir?: string;
    program_studi?: string;
    riwayat_pendidikan_formal_jenjang_pendidikan?: string;
    riwayat_sertifikasi?: string;
    tahun_sertifikasi?: string;
    kode_kecamatan?: string;
    kode_kabupaten?: string;
    validation_status?: string;
    backbone_last_synced_at: string | null;
    created_at: string;
    updated_at: string;
    // field lain kalau ada
};

export type PtkListResponse = {
    current_page: number;
    data: Ptk[];
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

export type ListPtkParams = {
    status_kepegawaian?: string;
    kode_kecamatan?: string;
    validation_status?: string;
    page?: number;
    per_page?: number;
};

export async function listPtk(params: ListPtkParams = {}): Promise<PtkListResponse> {
    const searchParams = new URLSearchParams();

    if (params.status_kepegawaian) {
        searchParams.append("status_kepegawaian", params.status_kepegawaian);
    }

    if (params.kode_kecamatan) {
        searchParams.append("kode_kecamatan", params.kode_kecamatan);
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
        .get("ptk", {
            searchParams,
        })
        .json<PtkListResponse>();
}

export async function getPtkById(ptkId: number | string): Promise<Ptk> {
    return apiPrivate.get(`ptk/${ptkId}`).json<Ptk>();
}

export async function verifyPtk(ptkId: number | string): Promise<Ptk> {
    return apiPrivate.post(`ptk/${ptkId}/verify`).json<Ptk>();
}

export async function approvePtk(ptkId: number | string): Promise<Ptk> {
    return apiPrivate.post(`ptk/${ptkId}/approve`).json<Ptk>();
}

export async function updatePtk(ptkId: number | string, payload: UpdatePtkInput): Promise<Ptk> {
    return apiPrivate
        .put(`ptk/${ptkId}`, {
            json: payload,
        })
        .json<Ptk>();
}
