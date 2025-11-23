import {
    getSchoolById,
    listSchools,
    ListSchoolsParams,
    School,
    SchoolListResponse,
    updateSchool,
    UpdateSchoolInput,
    verifySchool,
} from "@/lib/services/school";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {toast} from "sonner";

export function useSchools(params: ListSchoolsParams) {
    return useQuery<SchoolListResponse, Error>({
        queryKey: ["schools", params],
        queryFn: () => listSchools(params),
    });
}

export function useSchool(studentId: number | string) {
    return useQuery<School, Error>({
        queryKey: ["school", studentId],
        queryFn: () => getSchoolById(studentId),
    });
}

export function useVerifySchool() {
    const queryClient = useQueryClient();

    return useMutation<School, Error, number | string>({
        mutationKey: ["verify-school"],
        mutationFn: (schoolId) => verifySchool(schoolId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", data.id],
            });

            toast.success("Sekolah berhasil diverifikasi", {
                description: `${data.nama} sudah berstatus terverifikasi.`,
            });
        },
        onError: (error, variables, context) => {
            toast.error("Gagal memverifikasi sekolah", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

export function useApproveSchool() {
    const queryClient = useQueryClient();

    return useMutation<School, Error, number | string>({
        mutationKey: ["approve-school"],
        mutationFn: (schoolId) => verifySchool(schoolId),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", data.id],
            });

            toast.success("Sekolah berhasil di-approve", {
                description: `${data.nama} sudah disetujui.`,
            });
        },
        onError: (error) => {
            toast.error("Gagal meng-approve sekolah", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

type UpdateSchoolVars = {
    id: number | string;
    data: UpdateSchoolInput;
};

export function useUpdateSchool() {
    const queryClient = useQueryClient();

    return useMutation<School, Error, UpdateSchoolVars>({
        mutationKey: ["update-school"],
        mutationFn: ({id, data}) => updateSchool(id, data),
        onSuccess: (res, variables, context) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", res.id],
            });

            toast.success("Data sekolah berhasil diperbarui", {
                description: res.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal memperbarui data sekolah", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}
