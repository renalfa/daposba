import {api} from "./api";

export type School = {
    id: number;
    name: string;
    alamat_jalan?: string;
    desa_kelurahan?: string;
    kecamatan?: string;
    kabupaten?: string;
    provinsi?: string;
    nama_bank?: string;
    no_rekening?: string;
    rekening_atas_nama?: string;
    validation_status?: string;
};

export type ListSchoolsParams = {
    kecamatan?: string;
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

export type SchoolListResponse = {
    data: School[];
    meta?: PaginationMeta;
};

const token = localStorage.getItem("token");

export async function listSchools(params: ListSchoolsParams = {}): Promise<SchoolListResponse> {
    const searchParams = new URLSearchParams();

    if (!token) {
        throw new Error("Token not found");
    }

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

    return api
        .get("schools", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            searchParams,
        })
        .json<SchoolListResponse>();
}

export type SchoolDetailResponse = {
    data: School;
};

export async function getSchoolById(studentId: number | string): Promise<SchoolDetailResponse> {
    return api
        .get(`schools/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<SchoolDetailResponse>();
}

export async function verifySchool(schoolId: number | string): Promise<SchoolDetailResponse> {
    return api
        .post(`schools/${schoolId}/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<SchoolDetailResponse>();
}

export async function approveSchool(schoolId: number | string): Promise<SchoolDetailResponse> {
    return api
        .post(`schools/${schoolId}/approve`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<SchoolDetailResponse>();
}

export type UpdateSchoolInput = {
    nama?: string;
    alamat_jalan?: string;
    desa_kelurahan?: string;
    kecamatan?: string;
    kabupaten?: string;
    provinsi?: string;
    nama_bank?: string;
    no_rekening?: string;
    rekening_atas_nama?: string;
};

export async function updateSchool(
    schoolId: number | string,
    payload: UpdateSchoolInput
): Promise<SchoolDetailResponse> {
    return api
        .put(`schools/${schoolId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: payload,
        })
        .json<SchoolDetailResponse>();
}
