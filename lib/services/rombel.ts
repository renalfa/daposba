import {apiPrivate} from "./api";
import type { UpdateRombelFormValues } from "@/lib/validators/rombel";

export type UpdateRombelInput = UpdateRombelFormValues;

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
    tanggal_mulai?: string | null;
    tanggal_selesai?: string | null;
    validation_status?: string;
    backbone_last_synced_at: string | null;
    created_at: string;
    updated_at: string;
    // tambahin field lain sesuai response API rombel-mu
};

export type RombelListResponse = {
    current_page: number;
    data: Rombel[];
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

export type ListRombelsParams = {
    tingkat_pendidikan?: string;
    validation_status?: string;
    page?: number;
    per_page?: number;
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

export async function getRombelById(rombelId: number | string): Promise<Rombel> {
    return apiPrivate.get(`rombels/${rombelId}`).json<Rombel>();
}

export async function verifyRombel(rombelId: number | string): Promise<Rombel> {
    return apiPrivate.post(`rombels/${rombelId}/verify`).json<Rombel>();
}

export async function approveRombel(rombelId: number | string): Promise<Rombel> {
    return apiPrivate.post(`rombels/${rombelId}/approve`).json<Rombel>();
}

export async function updateRombel(rombelId: number | string, payload: UpdateRombelInput): Promise<Rombel> {
    return apiPrivate
        .put(`rombels/${rombelId}`, {
            json: payload,
        })
        .json<Rombel>();
}
