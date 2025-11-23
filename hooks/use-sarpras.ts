"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getSarprasById,
    listSarpras,
    SarprasDetailResponse,
    updateSarpras,
    UpdateSarprasInput,
    verifySarpras,
    type ListSarprasParams,
    type SarprasListResponse,
} from "@/lib/services/sarpras";

export function useSarpras(params: ListSarprasParams) {
    return useQuery<SarprasListResponse, Error>({
        queryKey: ["sarpras", params],
        queryFn: () => listSarpras(params),
    });
}

export function useSarprasById(id: number | string) {
    return useQuery<SarprasDetailResponse, Error>({
        queryKey: ["sarpras", id],
        queryFn: () => getSarprasById(id),
    });
}

export function useVerifySarpras() {
    const queryClient = useQueryClient();

    return useMutation<SarprasDetailResponse, Error, number | string>({
        mutationKey: ["verify-sarpras"],
        mutationFn: (sarprasId) => verifySarpras(sarprasId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["sarpras"]});
            queryClient.invalidateQueries({
                queryKey: ["sarpras", data.data.id],
            });
        },
    });
}

export function useApproveSarpras() {
    const queryClient = useQueryClient();

    return useMutation<SarprasDetailResponse, Error, number | string>({
        mutationKey: ["approve-sarpras"],
        mutationFn: (sarprasId) => verifySarpras(sarprasId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["sarpras"]});
            queryClient.invalidateQueries({
                queryKey: ["sarpras", data.data.id],
            });
        },
    });
}

type UpdateSarprasVars = {
    id: number | string;
    data: UpdateSarprasInput;
};

export function useUpdateSarpras() {
    const queryClient = useQueryClient();

    return useMutation<SarprasDetailResponse, Error, UpdateSarprasVars>({
        mutationKey: ["update-sarpras"],
        mutationFn: ({id, data}) => updateSarpras(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["sarpras"]});
            queryClient.invalidateQueries({
                queryKey: ["sarpras", res.data.id],
            });
        },
    });
}
