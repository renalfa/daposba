"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/ptk.column";
import {usePtk} from "@/hooks/use-ptk";
import {CheckIcon, FolderSync} from "lucide-react";
import {Button} from "@/components/ui/button";
import LoadingTable from "@/components/loading-table";

export default function PtkPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: ptk, isLoading} = usePtk({
        status_kepegawaian: "",
        kode_kecamatan: "",
        validation_status: "",
        page: pageIndex + 1,
        per_page: pageSize,
    });

    if (isLoading || !ptk) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <h1 className="text-xl font-semibold">Data Pendidik dan Tenaga Kependidikan</h1>
                <div className="space-x-2">
                    <Button>
                        <CheckIcon /> Submit Data
                    </Button>
                    <Button>
                        <FolderSync /> Sync Data
                    </Button>
                </div>
            </div>{" "}
            <NewDataTable
                columns={columns}
                data={ptk.data}
                searchableColumn="nama"
                manualPagination
                pageIndex={pageIndex}
                serverPageSize={pageSize}
                pageCount={ptk.last_page}
                totalItems={ptk.total}
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
