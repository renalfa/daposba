import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Import} from "lucide-react";
import {columns, OtherRow} from "./_components/other.column";

export function getMockOthers(): OtherRow[] {
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

    const out: OtherRow[] = [];

    for (let i = 0; i < schoolNames.length; i++) {
        const school_npsn = `203${10000 + i}`;

        // data random tapi tetap masuk akal
        const total_teacher = Math.floor(20 + Math.random() * 30); // 20–50 guru
        const total_computer = Math.floor(10 + Math.random() * 50); // 10–60 komputer
        const total_board = Math.floor(10 + Math.random() * 25); // papan tulis
        const total_table = Math.floor(100 + Math.random() * 300); // meja siswa
        const total_chair = total_table + Math.floor(Math.random() * 20); // kursi bisa lebih banyak

        out.push({
            id: `OTH-${String(i + 1).padStart(3, "0")}`,
            school_name: schoolNames[i],
            school_npsn,
            total_table,
            total_chair,
            total_board,
            total_computer,
            total_teacher,
        });
    }

    return out;
}

export default async function OtherPage() {
    const data = getMockOthers();

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management Lain-Lain</h1>
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
