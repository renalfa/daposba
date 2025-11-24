"use client";

import {useParams, useRouter} from "next/navigation";
import {Loader2} from "lucide-react";

import {useSchool} from "@/hooks/use-schools";
import {Skeleton} from "@/components/ui/skeleton";

import {SchoolEditForm} from "./_components/edit.form";

export default function SchoolsDetailPage() {
    const router = useRouter();
    const params = useParams<{id: string}>();
    const {data: school, isLoading, isError} = useSchool(params.id);

    if (isLoading && !school) {
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

    if (isError || !school) {
        return (
            <div className="p-4">
                <p className="text-sm text-red-500">Data sekolah tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Data Sekolah</h1>
                {isLoading && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Memuat ulang data...
                    </span>
                )}
            </div>

            <SchoolEditForm
                school={school}
                onSuccess={() => {
                    router.push("/school-profile");
                }}
            />
        </div>
    );
}
