import {apiPrivate} from "./api";
import type {UpdateStudentFormValues} from "@/lib/validators/student";

export type UpdateStudentInput = UpdateStudentFormValues;

export type Student = {
    id: number;
    nama: string;
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
    backbone_last_synced_at: string | null;
    created_at: string;
    updated_at: string;
};

export type StudentListResponse = {
    current_page: number;
    data: Student[];
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

export type ListStudentsParams = {
    status?: string;
    layak_pip?: boolean;
    penerima_kip?: boolean;
    validation_status?: string;
    page?: number;
    per_page?: number;
};

export async function listStudents(params: ListStudentsParams = {}): Promise<StudentListResponse> {
    const searchParams = new URLSearchParams();

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

    return apiPrivate
        .get("students", {
            searchParams,
        })
        .json<StudentListResponse>();
}

export async function getStudentById(studentId: number | string): Promise<Student> {
    return apiPrivate.get(`students/${studentId}`).json<Student>();
}

export async function verifyStudent(studentId: number | string): Promise<Student> {
    return apiPrivate.post(`students/${studentId}/verify`).json<Student>();
}

export async function approveStudent(studentId: number | string): Promise<Student> {
    return apiPrivate.post(`students/${studentId}/approve`).json<Student>();
}

export async function updateStudent(studentId: number | string, payload: UpdateStudentInput): Promise<Student> {
    return apiPrivate
        .put(`students/${studentId}`, {
            json: payload,
        })
        .json<Student>();
}
