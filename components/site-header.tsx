"use client";

import {SidebarIcon} from "lucide-react";

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

export function SiteHeader() {
    const {toggleSidebar} = useSidebar();

    return (
        <header className="bg-[#0E2148] sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button className="h-8 w-8" size="icon" onClick={toggleSidebar}>
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 ml-1.5 h-4 bg-yellow-300" />
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#" className="text-blue-400 hover:text-blue-500">Daposba</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
}
