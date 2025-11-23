import React from "react";
import {Skeleton} from "./ui/skeleton";

export default function LoadingTable() {
    return (
        <div className="p-4 space-y-4">
            {/* Header skeleton */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-7 w-56" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Table skeleton */}
            <div className="border rounded-md">
                {/* header */}
                <div className="flex items-center border-b px-4 py-3 gap-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-9 w-64 ml-auto" />
                </div>
                {/* rows */}
                <div className="divide-y">
                    {Array.from({length: 8}).map((_, i) => (
                        <div key={i} className="flex items-center px-4 py-3 gap-4">
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-4 flex-1" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
