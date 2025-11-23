"use client";

import * as React from "react";

import {NewDataTable} from "@/components/ui/new-data-table";
import {Button} from "@/components/ui/button";
import LoadingTable from "@/components/loading-table";
import {columns} from "./_components/sarpras.column";

import {useSarpras} from "@/hooks/use-sarpras";

import {CheckIcon, FolderSync, Loader2} from "lucide-react";

export default function SarprasPage() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const {data: sarpras, isLoading} = useSarpras({
        kategori: "bangunan",
        validation_status: "draft_school",
        page: pageIndex,
        per_page: pageSize,
    });

    if (isLoading && !sarpras) {
        return <LoadingTable />;
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Data Sarana & Prasarana</h1>
                    {isLoading && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Memuat ulang data...
                        </span>
                    )}
                </div>

                <div className="space-x-2">
                    <Button>
                        <CheckIcon className="mr-1 h-4 w-4" /> Submit Data
                    </Button>
                    <Button variant="outline">
                        <FolderSync className="mr-1 h-4 w-4" /> Sync Data
                    </Button>
                </div>
            </div>

            <NewDataTable
                columns={columns}
                data={sarpras?.data ?? []}
                searchableColumn="nama"
                manualPagination
                pageIndex={(sarpras?.current_page ?? 1) - 1}
                serverPageSize={sarpras?.per_page ?? pageSize}
                pageCount={sarpras?.last_page ?? 0}
                totalItems={sarpras?.total ?? 0}
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
