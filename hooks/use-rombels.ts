"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getRombelById,
    listRombels,
    RombelDetailResponse,
    updateRombel,
    UpdateRombelInput,
    verifyRombel,
    type ListRombelsParams,
    type RombelListResponse,
} from "@/lib/services/rombel";

export function useRombels(params: ListRombelsParams) {
    return useQuery<RombelListResponse, Error>({
        queryKey: ["rombels", params],
        queryFn: () => listRombels(params),
    });
}

export function useRombel(rombelId: number | string) {
    return useQuery<RombelDetailResponse, Error>({
        queryKey: ["rombel", rombelId],
        queryFn: () => getRombelById(rombelId),
    });
}

export function useVerifyRombel() {
    const queryClient = useQueryClient();

    return useMutation<RombelDetailResponse, Error, number | string>({
        mutationKey: ["verify-rombel"],
        mutationFn: (rombelId) => verifyRombel(rombelId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", data.data.id],
            });
        },
    });
}

export function useApproveRombel() {
    const queryClient = useQueryClient();

    return useMutation<RombelDetailResponse, Error, number | string>({
        mutationKey: ["approve-rombel"],
        mutationFn: (rombelId) => verifyRombel(rombelId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", data.data.id],
            });
        },
    });
}

type UpdateRombelVars = {
    id: number | string;
    data: UpdateRombelInput;
};

export function useUpdateRombel() {
    const queryClient = useQueryClient();

    return useMutation<RombelDetailResponse, Error, UpdateRombelVars>({
        mutationKey: ["update-rombel"],
        mutationFn: ({id, data}) => updateRombel(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", res.data.id],
            });
        },
    });
}
