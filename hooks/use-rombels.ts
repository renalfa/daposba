"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getRombelById,
    listRombels,
    Rombel,
    updateRombel,
    UpdateRombelInput,
    verifyRombel,
    type ListRombelsParams,
    type RombelListResponse,
} from "@/lib/services/rombel";
import {toast} from "sonner";

export function useRombels(params: ListRombelsParams) {
    return useQuery<RombelListResponse, Error>({
        queryKey: ["rombels", params],
        queryFn: () => listRombels(params),
    });
}

export function useRombel(rombelId: number | string) {
    return useQuery<Rombel, Error>({
        queryKey: ["rombel", rombelId],
        queryFn: () => getRombelById(rombelId),
    });
}

export function useVerifyRombel() {
    const queryClient = useQueryClient();

    return useMutation<Rombel, Error, number | string>({
        mutationKey: ["verify-rombel"],
        mutationFn: (rombelId) => verifyRombel(rombelId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", data.id],
            });

            toast.success("Rombel berhasil diverifikasi", {
                description: data.nama_rombel ?? `ID: ${data.id}`,
            });
        },
        onError: (error) => {
            toast.error("Gagal memverifikasi rombel", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

export function useApproveRombel() {
    const queryClient = useQueryClient();

    return useMutation<Rombel, Error, number | string>({
        mutationKey: ["approve-rombel"],
        mutationFn: (rombelId) => verifyRombel(rombelId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", data.id],
            });

            toast.success("Rombel berhasil di-approve", {
                description: data.nama_rombel ?? `ID: ${data.id}`,
            });
        },
        onError: (error) => {
            toast.error("Gagal meng-approve rombel", {
                description: error.message ?? "Terjadi kesalahan pada server.",
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

    return useMutation<Rombel, Error, UpdateRombelVars>({
        mutationKey: ["update-rombel"],
        mutationFn: ({id, data}) => updateRombel(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["rombels"]});
            queryClient.invalidateQueries({
                queryKey: ["rombel", res.id],
            });

            toast.success("Data rombel berhasil diperbarui", {
                description: res.nama_rombel ?? `ID: ${res.id}`,
            });
        },
        onError: (error) => {
            toast.error("Gagal memperbarui data rombel", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}
