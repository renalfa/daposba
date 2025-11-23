"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getStudentById,
    listStudents,
    Student,
    updateStudent,
    UpdateStudentInput,
    verifyStudent,
    type ListStudentsParams,
    type StudentListResponse,
} from "@/lib/services/student";
import {toast} from "sonner";

export function useStudents(params: ListStudentsParams) {
    return useQuery<StudentListResponse, Error>({
        queryKey: ["students", params],
        queryFn: () => listStudents(params),
    });
}

export function useStudent(studentId: number | string) {
    return useQuery<Student, Error>({
        queryKey: ["student", studentId],
        queryFn: () => getStudentById(studentId),
    });
}

export function useVerifyStudent() {
    const queryClient = useQueryClient();

    return useMutation<Student, Error, number | string>({
        mutationKey: ["verify-student"],
        mutationFn: (studentId) => verifyStudent(studentId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", data.id],
            });

            toast.success("Siswa berhasil diverifikasi", {
                description: data.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal memverifikasi siswa", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

export function useApproveStudent() {
    const queryClient = useQueryClient();

    return useMutation<Student, Error, number | string>({
        mutationKey: ["approve-student"],
        mutationFn: (studentId) => verifyStudent(studentId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", data.id],
            });

            toast.success("Siswa berhasil di-approve", {
                description: data.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal meng-approve siswa", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

type UpdateStudentVars = {
    id: number | string;
    data: UpdateStudentInput;
};

export function useUpdateStudent() {
    const queryClient = useQueryClient();

    return useMutation<Student, Error, UpdateStudentVars>({
        mutationKey: ["update-student"],
        mutationFn: ({id, data}) => updateStudent(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", res.id],
            });

            toast.success("Data siswa berhasil diperbarui", {
                description: res.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal memperbarui data siswa", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}
