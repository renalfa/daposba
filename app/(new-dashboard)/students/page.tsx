"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/students.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import {useStudents} from "@/hooks/use-students";
import LoadingTable from "@/components/loading-table";

export default function StudentsPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);

    const {data: students, isLoading} = useStudents({
        status: "",
        layak_pip: true,
        penerima_kip: true,
        validation_status: "",
        page: pageIndex + 1,
        per_page: pageSize,
    });

    if (isLoading || !students) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <h1 className="text-xl font-semibold">Data Peserta Didik</h1>
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
                data={students.data}
                searchableColumn="nama"
                manualPagination
                pageIndex={pageIndex}
                serverPageSize={pageSize}
                pageCount={students.last_page}
                totalItems={students.total}
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
