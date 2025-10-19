import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Import} from "lucide-react";
import {columns, StudentRow} from "./_components/students.column";

function getMockStudents(): StudentRow[] {
    const genders = ["male", "female"] as const;
    const classes = ["X IPA 1", "X IPA 2", "XI IPS 1", "XI IPS 2", "XII IPA 1", "XII IPS 2"];

    const out: StudentRow[] = [];
    for (let i = 1; i <= 120; i++) {
        const gender = genders[i % 2];
        const className = classes[i % classes.length];
        out.push({
            id: `STD-${String(i).padStart(3, "0")}`,
            nik: `357702234101${1000 + i}`,
            nisn: `005${100000 + i}`,
            name: `Siswa ${i}`,
            gender,
            class_name: className,
            age: 15 + (i % 5),
            email: `siswa${i}@example.com`,
            phone: `0812${Math.floor(1000000 + Math.random() * 8999999)}`,
        });
    }
    return out;
}

export default async function StudentsPage() {
    const data = getMockStudents();

    const uniqueClasses = Array.from(new Set(data.map((d) => d.class_name))).map((cls) => ({
        label: cls,
        value: cls,
    }));

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management Siswa</h1>
                <Link href="/student/new">
                    <Button className="cursor-pointer">
                        <Import />
                        Import Siswa
                    </Button>
                </Link>
            </div>{" "}
            <DataTable
                columns={columns}
                data={data}
                searchableColumn="name"
                facetedFilters={{
                    class_name: uniqueClasses,
                }}
                pageSize={10}
            />
        </main>
    );
}
