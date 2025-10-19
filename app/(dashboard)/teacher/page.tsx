import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Import} from "lucide-react";
import {columns, TeacherRow} from "./_components/teacher.column";

export function getMockTeachers(): TeacherRow[] {
    const genders = ["male", "female"] as const;
    const statuses = ["induk", "non-induk"] as const;
    const birthPlaces = ["Jepara", "Kudus", "Demak", "Pati", "Semarang", "Rembang", "Blora", "Purwodadi"];

    const out: TeacherRow[] = [];
    for (let i = 1; i <= 60; i++) {
        const gender = genders[i % 2];
        const status = statuses[i % 2];
        const location = birthPlaces[i % birthPlaces.length];

        const year = 1970 + Math.floor(Math.random() * 21);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
        const birth_date = `${year}-${month}-${day}`;

        out.push({
            id: `TCH-${String(i).padStart(3, "0")}`,
            nuptk: `6200${100000 + i}`,
            nip: `197${year}${month}${day}00${i}`,
            nik: `357702${100000 + i}`,
            name: `Guru ${i}`,
            gender,
            location,
            birth_date,
            status,
            email: `guru${i}@example.com`,
        });
    }

    return out;
}

export default async function StudentsPage() {
    const data = getMockTeachers();

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management Guru</h1>
                <Link href="/student/new">
                    <Button className="cursor-pointer">
                        <Import />
                        Import Guru
                    </Button>
                </Link>
            </div>
            <DataTable columns={columns} data={data} searchableColumn="name" pageSize={10} />
        </main>
    );
}
