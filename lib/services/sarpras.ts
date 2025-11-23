import {apiPrivate} from "./api";

export type Sarpras = {
    id: number;
    nama: string;
    kategori?: "tanah" | "bangunan" | "ruang" | "alat" | "buku" | "sanitasi";
    kode_barang?: string;
    luas?: number;
    no_sertifikat_tanah?: string;
    kepemilikan_sarpras?: string;
    tahun_dibangun?: number;
    nilai_aset?: number;
    luas_tapak_bangunan?: number;
    kondisi?: "Baik" | "Rusak Ringan" | "Rusak Berat";
    jenis_prasarana?: string;
    kapasitas?: number;
    jumlah_layak?: number;
    jumlah_tidak_layak?: number;
    nm_buku?: string;
    sumber_air?: string;
    toilet_siswa?: number;
    tempat_sampah?: boolean;
    a_sabun_air_mengalir?: boolean;
    validation_status: string;
    backbone_last_synced_at: string | null;
    created_at: string;
    updated_at: string;
    // + field lain dari list/detail kalau ada
};

export type SarprasListResponse = {
    current_page: number;
    data: Sarpras[];
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

export type ListSarprasParams = {
    kategori?: string;
    validation_status?: string;
    page?: number;
    per_page?: number;
};

export async function listSarpras(params: ListSarprasParams = {}): Promise<SarprasListResponse> {
    const searchParams = new URLSearchParams();

    if (params.kategori) {
        searchParams.append("kategori", params.kategori);
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
        .get("sarpras", {
            searchParams,
        })
        .json<SarprasListResponse>();
}

export type SarprasDetailResponse = {
    data: Sarpras;
};

export async function getSarprasById(sarprasId: number | string): Promise<SarprasDetailResponse> {
    return apiPrivate.get(`sarpras/${sarprasId}`).json<SarprasDetailResponse>();
}

export async function verifySarpras(sarprasId: number | string): Promise<SarprasDetailResponse> {
    return apiPrivate.post(`sarpras/${sarprasId}/verify`).json<SarprasDetailResponse>();
}

export async function approveSarpras(sarprasId: number | string): Promise<SarprasDetailResponse> {
    return apiPrivate.post(`sarpras/${sarprasId}/approve`).json<SarprasDetailResponse>();
}

export type UpdateSarprasInput = {
    nama?: string; // alat
    kode_barang?: string; // umum
    luas?: number; // tanah
    no_sertifikat_tanah?: string; // tanah
    kepemilikan_sarpras?: string; // tanah
    tahun_dibangun?: number; // bangunan
    nilai_aset?: number; // bangunan
    luas_tapak_bangunan?: number; // bangunan
    kondisi?: string; // bangunan/ruang
    jenis_prasarana?: string; // ruang
    kapasitas?: number; // ruang
    jumlah_layak?: number; // alat/buku
    jumlah_tidak_layak?: number; // alat/buku
    nm_buku?: string; // buku
    sumber_air?: string; // sanitasi
    toilet_siswa?: number; // sanitasi
    tempat_sampah?: boolean; // sanitasi
    a_sabun_air_mengalir?: boolean; // sanitasi
};

export async function updateSarpras(
    sarprasId: number | string,
    payload: UpdateSarprasInput
): Promise<SarprasDetailResponse> {
    return apiPrivate
        .put(`sarpras/${sarprasId}`, {
            json: payload,
        })
        .json<SarprasDetailResponse>();
}
