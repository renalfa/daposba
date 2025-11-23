"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {useSchools} from "@/hooks/use-schools";

import {columns} from "./_components/profile-school.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import LoadingTable from "@/components/loading-table";

export default function SchoolsPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: school, isLoading} = useSchools({
        kecamatan: "",
        validation_status: "",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading || !school) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <h1 className="text-xl font-semibold">Data Sekolah</h1>
                <div className="space-x-2">
                    <Button>
                        <CheckIcon /> Submit Data
                    </Button>
                    <Button>
                        <FolderSync /> Sync Data
                    </Button>
                </div>
            </div>
            <NewDataTable
                columns={columns}
                data={school.data}
                searchableColumn="nama"
                manualPagination
                pageIndex={school.current_page - 1}
                serverPageSize={school.per_page}
                pageCount={school.last_page}
                totalItems={school.total}
                onPageChange={(nextPageIndex) => {
                    setPageIndex(nextPageIndex);
                }}
                onPageSizeChange={(nextSize) => {
                    setPageSize(nextSize);
                    setPageIndex(0);
                }}
            />
        </div>
    );
}
