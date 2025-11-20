import {api} from "./api";

export type Student = {
    id: number;
    name: string;
    nisn?: string;
    nik?: string;
    jenis_kelamin?: string;
    tanggal_lahir?: string;
    alamat?: string;
    alamat_jalan?: string;
    jarak_rumah_ke_sekolah?: number;
    nama_ayah?: string;
    nama_ibu?: string;
    penghasilan_ayah?: string;
    pekerjaan_ayah?: string;
    pekerjaan_ibu?: string;
    penerima_kip?: boolean | null;
    layak_pip?: boolean | null;
    status?: string;
    jenis_pendaftaran_rombel?: string;
    sekolah_asal?: string;
    jenis_keluar?: string;
    tanggal_masuk?: string;
    tanggal_keluar?: string;
    validation_status?: string;
};

export type ListStudentsParams = {
    status?: string;
    layak_pip?: boolean;
    penerima_kip?: boolean;
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

export type StudentListResponse = {
    data: Student[];
    meta?: PaginationMeta;
};

export type UpdateStudentInput = {
    nama?: string;
    nisn?: string;
    nik?: string;
    jenis_kelamin?: string;
    tanggal_lahir?: string; // format: "YYYY-MM-DD"
    alamat?: string;
    alamat_jalan?: string;
    jarak_rumah_ke_sekolah?: number;
    nama_ayah?: string;
    nama_ibu?: string;
    penghasilan_ayah?: string;
    pekerjaan_ayah?: string;
    pekerjaan_ibu?: string;
    penerima_kip?: boolean;
    layak_pip?: boolean;
    status?: string;
    jenis_pendaftaran_rombel?: string;
    sekolah_asal?: string;
    jenis_keluar?: string;
    tanggal_masuk?: string; // "YYYY-MM-DD"
    tanggal_keluar?: string; // "YYYY-MM-DD"
};

const token = localStorage.getItem("token");

export async function listStudents(params: ListStudentsParams = {}): Promise<StudentListResponse> {
    const searchParams = new URLSearchParams();

    if (!token) {
        throw new Error("Token not found");
    }

    if (params.status) {
        searchParams.append("status", params.status);
    }

    if (typeof params.layak_pip === "boolean") {
        searchParams.append("layak_pip", String(params.layak_pip));
    }

    if (typeof params.penerima_kip === "boolean") {
        searchParams.append("penerima_kip", String(params.penerima_kip));
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
        .get("students", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            searchParams,
        })
        .json<StudentListResponse>();
}

export type StudentDetailResponse = {
    data: Student;
};

export async function getStudentById(studentId: number | string): Promise<StudentDetailResponse> {
    return api
        .get(`students/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<StudentDetailResponse>();
}

export async function verifyStudent(studentId: number | string): Promise<StudentDetailResponse> {
    return api
        .post(`students/${studentId}/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<StudentDetailResponse>();
}

export async function approveStudent(studentId: number | string): Promise<StudentDetailResponse> {
    return api
        .post(`students/${studentId}/approve`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .json<StudentDetailResponse>();
}

export async function updateStudent(
    studentId: number | string,
    payload: UpdateStudentInput
): Promise<StudentDetailResponse> {
    return api
        .put(`students/${studentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            json: payload,
        })
        .json<StudentDetailResponse>();
}
