"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getStudentById,
    listStudents,
    StudentDetailResponse,
    updateStudent,
    UpdateStudentInput,
    verifyStudent,
    type ListStudentsParams,
    type StudentListResponse,
} from "@/lib/services/student";

export function useStudents(params: ListStudentsParams) {
    return useQuery<StudentListResponse, Error>({
        queryKey: ["students", params],
        queryFn: () => listStudents(params),
    });
}

export function useStudent(studentId: number | string) {
    return useQuery<StudentDetailResponse, Error>({
        queryKey: ["student", studentId],
        queryFn: () => getStudentById(studentId),
    });
}

export function useVerifyStudent() {
    const queryClient = useQueryClient();

    return useMutation<StudentDetailResponse, Error, number | string>({
        mutationKey: ["verify-student"],
        mutationFn: (studentId) => verifyStudent(studentId),

        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", data.data.id],
            });
        },
    });
}

export function useApproveStudent() {
    const queryClient = useQueryClient();

    return useMutation<StudentDetailResponse, Error, number | string>({
        mutationKey: ["approve-student"],
        mutationFn: (studentId) => verifyStudent(studentId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", data.data.id],
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

    return useMutation<StudentDetailResponse, Error, UpdateStudentVars>({
        mutationKey: ["update-student"],
        mutationFn: ({id, data}) => updateStudent(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["students"]});
            queryClient.invalidateQueries({
                queryKey: ["student", res.data.id],
            });
        },
    });
}
