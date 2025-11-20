"use client";

import {usePtk} from "@/hooks/use-ptk";
import {useRombels} from "@/hooks/use-rombels";
import {useSarpras} from "@/hooks/use-sarpras";
import {useSchool, useSchools} from "@/hooks/use-schools";
import {useStudents} from "@/hooks/use-students";

export default function DashboardPage() {
    const {data: schools, isLoading: schoolLoading} = useSchools({
        kecamatan: "",
        validation_status: "",
        page: 1,
        per_page: 10,
    });

    const {data: students, isLoading: studentLoading} = useStudents({
        status: "",
        layak_pip: false,
        penerima_kip: false,
        validation_status: "",
        page: 1,
        per_page: 10,
    });

    const {data: ptk, isLoading: ptkLoading} = usePtk({
        status_kepegawaian: "PNS",
        kode_kecamatan: "737101",
        validation_status: "verified_school",
        page: 1,
        per_page: 10,
    });

    const {data: rombel, isLoading: rombelLoading} = useRombels({
        tingkat_pendidikan: "VII",
        validation_status: "verified_school",
        page: 1,
        per_page: 10,
    });

    const {data: sarpras, isLoading: sarprasLoading} = useSarpras({
        kategori: "bangunan",
        validation_status: "draft_school",
        page: 1,
        per_page: 10,
    });

    const {data: schoolDetail, isLoading: schoolDetailLoading} = useSchool(1);

    console.log(schoolDetail);

    console.log(schools);
    console.log(students);
    console.log(ptk);
    console.log(rombel);
    console.log(sarpras);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
    );
}
