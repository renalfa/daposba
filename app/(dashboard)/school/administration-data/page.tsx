import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Import} from "lucide-react";
import {columns, AdministrationDataRow} from "./_components/administration-data.column";

export function getMockAdministrationData(): AdministrationDataRow[] {
    const statuses = ["swasta", "negeri"] as const;
    const types = ["kb", "tk", "sd", "smp", "sma"] as const;
    const districts = ["Jepara", "Kudus", "Demak", "Pati", "Rembang", "Blora", "Semarang", "Grobogan"];

    const streets = [
        "Jl. Merdeka No.",
        "Jl. Pahlawan No.",
        "Jl. Diponegoro No.",
        "Jl. Kartini No.",
        "Jl. Ahmad Yani No.",
        "Jl. Pemuda No.",
        "Jl. Gatot Subroto No.",
        "Jl. Sudirman No.",
    ];

    const out: AdministrationDataRow[] = [];
    for (let i = 1; i <= 50; i++) {
        const status = statuses[i % 2];
        const type = types[i % types.length];
        const district = districts[i % districts.length];
        const street = streets[i % streets.length];
        const npsn = `203${10000 + i}`;
        const registration_code = `REG-${String(100000 + i)}`;
        const name = `${type.toUpperCase()} ${status === "negeri" ? "Negeri" : "Swasta"} ${district} ${i}`;

        out.push({
            id: `REGC-${String(i).padStart(3, "0")}`,
            name,
            npsn,
            status,
            type,
            address: `${street}${Math.floor(Math.random() * 100)}, ${district}`,
            district,
            registration_code,
        });
    }

    return out;
}

export default async function SchoolAdministrationDataPage() {
    const data = getMockAdministrationData();

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management Data Administrasi Sekolah</h1>
                <Link href="/student/new">
                    <Button className="cursor-pointer">
                        <Import />
                        Import Data Sekolah
                    </Button>
                </Link>
            </div>{" "}
            <DataTable columns={columns} data={data} searchableColumn="name" pageSize={10} />
        </main>
    );
}
