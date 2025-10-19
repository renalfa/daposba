import {DataTable} from "@/components/ui/data-table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Plus} from "lucide-react";
import {columns, UserDataRow} from "./_components/user-data.column";
import {useMemo} from "react";

export function getMockUsers(): UserDataRow[] {
    const statuses = ["active", "inactive"] as const;

    const out: UserDataRow[] = [];
    for (let i = 1; i <= 80; i++) {
        const status = statuses[i % 2];

        // tanggal dibuat random antara 2023-2025
        const year = 2023 + Math.floor(Math.random() * 3);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
        const created_at = `${year}-${month}-${day}T${String(Math.floor(Math.random() * 23)).padStart(2, "0")}:${String(
            Math.floor(Math.random() * 59)
        ).padStart(2, "0")}:00Z`;

        out.push({
            id: `USR-${String(i).padStart(4, "0")}`,
            email: `user${i}@example.com`,
            status,
            name: `User ${i}`,
            created_at,
        });
    }

    return out;
}

export default async function UserDataPage() {
    const data = getMockUsers();

    const activeOpts = useMemo(
        () => [
            {label: "Active", value: "active"},
            {label: "Inactive", value: "inactive"},
        ],
        []
    );

    return (
        <main className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Management User</h1>
                <Link href="/student/new">
                    <Button className="cursor-pointer">
                        <Plus />
                        Tambah User
                    </Button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={data}
                searchableColumn="name"
                facetedFilters={{
                    status: activeOpts,
                }}
                pageSize={10}
            />
        </main>
    );
}
