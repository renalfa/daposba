"use client";

import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
    getPtkById,
    listPtk,
    Ptk,
    updatePtk,
    UpdatePtkInput,
    verifyPtk,
    type ListPtkParams,
    type PtkListResponse,
} from "@/lib/services/ptk";
import {toast} from "sonner";

export function usePtk(params: ListPtkParams) {
    return useQuery<PtkListResponse, Error>({
        queryKey: ["ptk", params],
        queryFn: () => listPtk(params),
    });
}

export function usePtkById(id: number | string) {
    return useQuery<Ptk, Error>({
        queryKey: ["ptk", id],
        queryFn: () => getPtkById(id),
    });
}

export function useVerifyPtk() {
    const queryClient = useQueryClient();

    return useMutation<Ptk, Error, number | string>({
        mutationKey: ["verify-ptk"],
        mutationFn: (ptkId) => verifyPtk(ptkId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", data.id],
            });

            toast.success("PTK berhasil diverifikasi", {
                description: data.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal memverifikasi PTK", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}

export function useApprovePtk() {
    const queryClient = useQueryClient();

    return useMutation<Ptk, Error, number | string>({
        mutationKey: ["approve-ptk"],
        mutationFn: (ptkId) => verifyPtk(ptkId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", data.id],
            });

            toast.success("PTK berhasil di-approve", {
                description: data.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal meng-approve PTK", {
                description: error.message ?? "Terjadi kesalahan pada server.",
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

    return useMutation<Ptk, Error, UpdatePtkVars>({
        mutationKey: ["update-ptk"],
        mutationFn: ({id, data}) => updatePtk(id, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({queryKey: ["ptk"]});
            queryClient.invalidateQueries({
                queryKey: ["ptk", res.id],
            });

            toast.success("Data PTK berhasil diperbarui", {
                description: res.nama,
            });
        },
        onError: (error) => {
            toast.error("Gagal memperbarui data PTK", {
                description: error.message ?? "Terjadi kesalahan pada server.",
            });
        },
    });
}
