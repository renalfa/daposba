"use client";

import {useParams, useRouter} from "next/navigation";

import {useSchool} from "@/hooks/use-schools";

import {SchoolEditForm} from "./_components/edit.form";

export default function SchoolsDetailPage() {
    const router = useRouter();
    const params = useParams<{id: string}>();
    const {data: school, isLoading} = useSchool(params.id);

    if (isLoading || !school) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-semibold">Data Sekolah</h1>
            <SchoolEditForm
                school={school}
                onSuccess={() => {
                    router.push("/school-profile");
                }}
            />
        </div>
    );
}
