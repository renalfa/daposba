import {api} from "./api";

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

const token = localStorage.getItem("token");

export async function listRombels(params: ListRombelsParams = {}): Promise<RombelListResponse> {
    const searchParams = new URLSearchParams();

    if (!token) {
        throw new Error("Token not found");
    }

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

    return api
        .get("rombels", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            searchParams,
        })
        .json<RombelListResponse>();
}

export type RombelDetailResponse = {
    data: Rombel;
};

export async function getRombelById(rombelId: number | string): Promise<RombelDetailResponse> {
    return api
        .get(`rombels/${rombelId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<RombelDetailResponse>();
}

export async function verifyRombel(rombelId: number | string): Promise<RombelDetailResponse> {
    return api
        .post(`rombels/${rombelId}/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<RombelDetailResponse>();
}

export async function approveRombel(rombelId: number | string): Promise<RombelDetailResponse> {
    return api
        .post(`rombels/${rombelId}/approve`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<RombelDetailResponse>();
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
    return api
        .put(`rombels/${rombelId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: payload,
        })
        .json<RombelDetailResponse>();
}
