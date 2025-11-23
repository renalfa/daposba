"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";

import {columns} from "./_components/sarpras.column";
import {Button} from "@/components/ui/button";
import {CheckIcon, FolderSync} from "lucide-react";
import { useSarpras } from "@/hooks/use-sarpras";

export default function SarprasPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: sarpras, isLoading} = useSarpras({
        kategori: "bangunan",
        validation_status: "draft_school",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading || !sarpras) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Data Sarana & Prasarana</h1>
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
                data={sarpras.data}
                searchableColumn="nama"
                manualPagination
                pageIndex={sarpras.current_page - 1}
                serverPageSize={sarpras.per_page}
                pageCount={sarpras.last_page}
                totalItems={sarpras.total}
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
