"use client";

import * as React from "react";
import {Database, Home, UserRound} from "lucide-react";

import {NavMain} from "@/components/nav-main";
import {NavUser} from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {menus} from "@/lib/menus";

const user = {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <Image
                                    src="/assets/images/logo.png"
                                    width={32}
                                    height={32}
                                    alt="Image"
                                    className="h-8 w-8"
                                    priority
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Daposba</span>
                                    <span className="truncate text-xs">Disdikbud Balikpapan</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={menus} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
