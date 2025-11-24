"use client";

import {useParams} from "next/navigation";
import {usePtkById} from "@/hooks/use-ptk";
import {PtkEditForm} from "./_components/edit.form";
import {useRouter} from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function PtkDetailPage() {
    const router = useRouter();

    const params = useParams<{id: string}>();
    const {data: ptk, isLoading, isError} = usePtkById(params.id);

    if (isLoading && !ptk) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-7 w-48" />

                <div className="rounded-md border p-4 space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Skeleton className="h-9 w-36" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !ptk) {
        return (
            <div className="p-4">
                <p className="text-sm text-red-500">Data peserta didik tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Data Pendidik dan Tenaga Kependidikan</h1>

            <PtkEditForm
                ptk={ptk}
                onSuccess={() => {
                    router.push("/school-profile");
                }}
            />
        </div>
    );
}
