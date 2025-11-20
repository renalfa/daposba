import {
    getSchoolById,
    listSchools,
    ListSchoolsParams,
    SchoolDetailResponse,
    SchoolListResponse,
    updateSchool,
    UpdateSchoolInput,
    verifySchool,
} from "@/lib/services/school";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";

export function useSchools(params: ListSchoolsParams) {
    return useQuery<SchoolListResponse, Error>({
        queryKey: ["schools", params],
        queryFn: () => listSchools(params),
    });
}

export function useSchool(studentId: number | string) {
    return useQuery<SchoolDetailResponse, Error>({
        queryKey: ["school", studentId],
        queryFn: () => getSchoolById(studentId),
    });
}

export function useVerifySchool() {
    const queryClient = useQueryClient();

    return useMutation<SchoolDetailResponse, Error, number | string>({
        mutationKey: ["verify-school"],
        mutationFn: (schoolId) => verifySchool(schoolId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", data.data.id],
            });
        },
    });
}

export function useApproveSchool() {
    const queryClient = useQueryClient();

    return useMutation<SchoolDetailResponse, Error, number | string>({
        mutationKey: ["approve-school"],
        mutationFn: (schoolId) => verifySchool(schoolId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", data.data.id],
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

    return useMutation<SchoolDetailResponse, Error, UpdateSchoolVars>({
        mutationKey: ["update-school"],
        mutationFn: ({id, data}) => updateSchool(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["schools"]});
            queryClient.invalidateQueries({
                queryKey: ["school", res.data.id],
            });
        },
    });
}
