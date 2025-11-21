import {apiPrivate} from "./api";

export type Rombel = {
    id: number;
    nama_rombel?: string;
    tingkat_pendidikan?: string;
    kurikulum?: string;
    jenis_rombel?: string;
    ruang?: string;
    ptk_id?: number;
    nama_ptk?: string;
    jumlah_siswa_laki?: number;
    jumlah_siswa_perempuan?: number;
    jumlah_anggota_rombel?: number;
    tanggal_mulai?: string;
    tanggal_selesai?: string;
    validation_status?: string;
    // tambahin field lain sesuai response API rombel-mu
};

export type ListRombelsParams = {
    tingkat_pendidikan?: string;
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

export type RombelListResponse = {
    data: Rombel[];
    meta?: PaginationMeta;
};

export async function listRombels(params: ListRombelsParams = {}): Promise<RombelListResponse> {
    const searchParams = new URLSearchParams();

    if (params.tingkat_pendidikan) {
        searchParams.append("tingkat_pendidikan", params.tingkat_pendidikan);
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
        .get("rombels", {
            searchParams,
        })
        .json<RombelListResponse>();
}

export type RombelDetailResponse = {
    data: Rombel;
};

export async function getRombelById(rombelId: number | string): Promise<RombelDetailResponse> {
    return apiPrivate.get(`rombels/${rombelId}`).json<RombelDetailResponse>();
}

export async function verifyRombel(rombelId: number | string): Promise<RombelDetailResponse> {
    return apiPrivate.post(`rombels/${rombelId}/verify`).json<RombelDetailResponse>();
}

export async function approveRombel(rombelId: number | string): Promise<RombelDetailResponse> {
    return apiPrivate.post(`rombels/${rombelId}/approve`).json<RombelDetailResponse>();
}

export type UpdateRombelInput = {
    nama_rombel?: string;
    tingkat_pendidikan?: string;
    kurikulum?: string;
    jenis_rombel?: string;
    ruang?: string;
    ptk_id?: number;
    nama_ptk?: string;
    jumlah_siswa_laki?: number;
    jumlah_siswa_perempuan?: number;
    jumlah_anggota_rombel?: number;
    tanggal_mulai?: string; // format: "YYYY-MM-DD"
    tanggal_selesai?: string; // format: "YYYY-MM-DD"
};

export async function updateRombel(
    rombelId: number | string,
    payload: UpdateRombelInput
): Promise<RombelDetailResponse> {
    return apiPrivate
        .put(`rombels/${rombelId}`, {
            json: payload,
        })
        .json<RombelDetailResponse>();
}
