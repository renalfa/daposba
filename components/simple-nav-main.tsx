"use client";

import {Home, School, Users, GraduationCap, Layers, Package, type LucideIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

type ApiMenuItem = {
    key: string;
    label: string;
    icon?: string;
    route: string;
    abilities?: string[];
};

const iconMap: Record<string, LucideIcon> = {
    home: Home,
    school: School,
    users: Users,
    "graduation-cap": GraduationCap,
    layers: Layers,
    package: Package,
};

export function SimpleNavMain({items}: {items: ApiMenuItem[]}) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <TopLevelItem key={item.key} item={item} pathname={pathname} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function TopLevelItem({item, pathname}: {item: ApiMenuItem; pathname: string}) {
    const isActive = matchPath(pathname, item.route);
    const Icon = item.icon ? iconMap[item.icon] : undefined;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={isActive ? "dark:bg-blue-500/20 bg-blue-50" : undefined}>
                <Link href={item.route || "#"}>
                    {Icon ? <Icon className={isActive ? "text-blue-400" : undefined} /> : null}
                    <span className={isActive ? "font-semibold text-blue-400" : undefined}>{item.label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

function matchPath(pathname: string, route?: string) {
    if (!route || route === "#") return false;
    try {
        return pathname === route || pathname.startsWith(route + "/");
    } catch {
        return false;
    }
}
