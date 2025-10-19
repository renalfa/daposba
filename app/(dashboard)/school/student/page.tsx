import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Import} from "lucide-react";
import {columns, StudentRow} from "./_components/student.column";

export function getMockSummaryStudents(): StudentRow[] {
    const schoolNames = [
        "SDN 1 Jepara",
        "SDN 2 Kudus",
        "SMPN 1 Demak",
        "SMPN 2 Pati",
        "SMAN 1 Rembang",
        "SMAN 2 Blora",
        "SMK 1 Grobogan",
        "SMK 2 Semarang",
    ];

    const out: StudentRow[] = [];

    for (let i = 0; i < schoolNames.length; i++) {
        const school_npsn = `203${10000 + i}`;
        const new_student = Math.floor(100 + Math.random() * 150);
        const graduated_student = Math.floor(50 + Math.random() * 100);
        const repeat_student = Math.floor(Math.random() * 20);
        const ungraduated_student = Math.floor(
            new_student - graduated_student - repeat_student > 0
                ? new_student - graduated_student - repeat_student
                : Math.random() * 10
        );

        out.push({
            id: `SUM-${String(i + 1).padStart(3, "0")}`,
            school_name: schoolNames[i],
            school_npsn,
            new_student,
            graduated_student,
            ungraduated_student,
            repeat_student,
        });
    }

    return out;
}

export default async function StudentsPage() {
    const data = getMockSummaryStudents();

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management Rekap Siswa</h1>
                <Link href="/student/new">
                    <Button className="cursor-pointer">
                        <Import />
                        Import Data
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} searchableColumn="school_name" pageSize={10} />
        </main>
    );
}
