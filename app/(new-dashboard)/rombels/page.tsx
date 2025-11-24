"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/rombels.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import {useRombels} from "@/hooks/use-rombels";
import LoadingTable from "@/components/loading-table";

export default function RombelPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: rombel, isLoading} = useRombels({
        tingkat_pendidikan: "",
        validation_status: "verified_school",
        page: pageIndex + 1,
        per_page: pageSize,
    });

    if (isLoading || !rombel) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <h1 className="text-xl font-semibold">Data Rombongan Belajar</h1>
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
                data={rombel.data}
                searchableColumn="nama_rombel"
                manualPagination
                pageIndex={pageIndex}
                serverPageSize={pageSize}
                pageCount={rombel.last_page}
                totalItems={rombel.total}
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
