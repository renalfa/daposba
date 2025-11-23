"use client";

import {SidebarIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import * as React from "react";

import {SearchForm} from "@/components/search-form";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useSidebar} from "@/components/ui/sidebar";
import {ThemeSwitcher} from "./theme-switcher";

const segmentNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    "school-profile": "Profil Sekolah",
    students: "Peserta Didik",
    rombels: "Rombongan Belajar",
    ptk: "Pendidik dan Tenaga Kependidikan",
    sarpras: "Sarana Dan Prasarana",
    // tambahkan mapping lain kalau perlu
};

function formatSegmentName(segment: string) {
    if (segmentNameMap[segment]) return segmentNameMap[segment];

    // fallback: ubah "school-profile" -> "School Profile"
    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function SiteHeader() {
    const {toggleSidebar} = useSidebar();
    const pathname = usePathname();

    const segments = React.useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

    // build breadcrumb items dari segments
    let currentHref = "";
    const breadcrumbSegments = segments.map((segment, index) => {
        currentHref += `/${segment}`;
        const isLast = index === segments.length - 1;

        return {
            label: formatSegmentName(segment),
            href: isLast ? undefined : currentHref,
            isLast,
        };
    });

    return (
        <header className="bg-[#0E2148] sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
                <Button className="h-8 w-8" size="icon" onClick={toggleSidebar}>
                    <SidebarIcon className="text-white" />
                </Button>
                <Separator orientation="vertical" className="mr-2 ml-1.5 h-4 bg-yellow-300" />

                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        {/* Root / brand */}
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard" className="text-blue-400 hover:text-blue-500">
                                Daposba
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {breadcrumbSegments.length > 0 && <BreadcrumbSeparator />}

                        {breadcrumbSegments.map((item, idx) => (
                            <React.Fragment key={item.label + idx}>
                                <BreadcrumbItem>
                                    {item.isLast || !item.href ? (
                                        <BreadcrumbPage className="text-white">{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href} className="text-blue-200 hover:text-blue-300">
                                            {item.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {idx !== breadcrumbSegments.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="ml-auto flex items-center gap-2">
                    {/* <SearchForm /> kalau mau dipakai */}
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
