import {apiPrivate} from "./api";

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
    // field lain kalau ada
};

export type ListPtkParams = {
    status_kepegawaian?: string;
    kode_kecamatan?: string;
    validation_status?: string;
    page?: number;
    per_page?: number;
};

export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
};

export type PtkListResponse = {
    data: Ptk[];
    meta?: PaginationMeta;
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

export type PtkDetailResponse = {
    data: Ptk;
};

export async function getPtkById(ptkId: number | string): Promise<PtkDetailResponse> {
    return apiPrivate.get(`ptk/${ptkId}`).json<PtkDetailResponse>();
}

export async function verifyPtk(ptkId: number | string): Promise<PtkDetailResponse> {
    return apiPrivate.post(`ptk/${ptkId}/verify`).json<PtkDetailResponse>();
}

export async function approvePtk(ptkId: number | string): Promise<PtkDetailResponse> {
    return apiPrivate.post(`ptk/${ptkId}/approve`).json<PtkDetailResponse>();
}

export type UpdatePtkInput = {
    nama?: string;
    nip?: string;
    nuptk?: string;
    jenis_kelamin?: string;
    status_kepegawaian?: string;
    jenis_ptk?: string;
    tmt_pengangkatan?: string; // "YYYY-MM-DD"
    sumber_gaji?: string;
    pendidikan_terakhir?: string;
    program_studi?: string;
    riwayat_pendidikan_formal_jenjang_pendidikan?: string;
    riwayat_sertifikasi?: string;
    tahun_sertifikasi?: string;
    kode_kecamatan?: string;
    kode_kabupaten?: string;
};

export async function updatePtk(ptkId: number | string, payload: UpdatePtkInput): Promise<PtkDetailResponse> {
    return apiPrivate
        .put(`ptk/${ptkId}`, {
            json: payload,
        })
        .json<PtkDetailResponse>();
}
