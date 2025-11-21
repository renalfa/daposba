"use client";

import * as React from "react";

import {NavUser} from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {useMenu} from "@/hooks/use-menus";
import {Skeleton} from "./ui/skeleton";
import {SimpleNavMain} from "./simple-nav-main";

const user = {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {data: menu, isLoading} = useMenu();

    if (isLoading) {
        return <SidebarSkeleton {...props} />;
    } else {
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
                    <SimpleNavMain items={menu ? menu.menus : []} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
            </Sidebar>
        );
    }
}

function SidebarSkeleton({...props}: React.ComponentProps<typeof Sidebar>) {
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
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarMenu>
                        {Array.from({length: 5}).map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full" />
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Skeleton className="h-10 w-full" />
            </SidebarFooter>
        </Sidebar>
    );
}
