"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getPtkById,
    listPtk,
    PtkDetailResponse,
    updatePtk,
    UpdatePtkInput,
    verifyPtk,
    type ListPtkParams,
    type PtkListResponse,
} from "@/lib/services/ptk";

export function usePtk(params: ListPtkParams) {
    return useQuery<PtkListResponse, Error>({
        queryKey: ["ptk", params],
        queryFn: () => listPtk(params),
    });
}

export function usePtkById(id: number | string) {
    return useQuery<PtkDetailResponse, Error>({
        queryKey: ["ptk", id],
        queryFn: () => getPtkById(id),
    });
}

export function useVerifyPtk() {
    const queryClient = useQueryClient();

    return useMutation<PtkDetailResponse, Error, number | string>({
        mutationKey: ["verify-ptk"],
        mutationFn: (ptkId) => verifyPtk(ptkId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", data.data.id],
            });
        },
    });
}

export function useApprovePtk() {
    const queryClient = useQueryClient();

    return useMutation<PtkDetailResponse, Error, number | string>({
        mutationKey: ["approve-ptk"],
        mutationFn: (ptkId) => verifyPtk(ptkId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", data.data.id],
            });
        },
    });
}

type UpdatePtkVars = {
    id: number | string;
    data: UpdatePtkInput;
};

export function useUpdatePtk() {
    const queryClient = useQueryClient();

    return useMutation<PtkDetailResponse, Error, UpdatePtkVars>({
        mutationKey: ["update-ptk"],
        mutationFn: ({id, data}) => updatePtk(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", res.data.id],
            });
        },
    });
}
