"use client";

import {useParams} from "next/navigation";
import {useStudent} from "@/hooks/use-students";
import {StudentEditForm} from "./_components/edit.form";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";

export default function StudentDetailPage() {
    const router = useRouter();

    const params = useParams<{id: string}>();
    const {data: student, isLoading, isError} = useStudent(params.id);

    if (isLoading && !student) {
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

    if (isError || !student) {
        return (
            <div className="p-4">
                <p className="text-sm text-red-500">Data peserta didik tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">Data Peserta Didik</h1>

            <StudentEditForm
                student={student}
                onSuccess={() => {
                    router.push("/students");
                }}
            />
        </div>
    );
}
