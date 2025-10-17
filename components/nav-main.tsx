"use client";

import {ChevronRight} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {MenuNode} from "@/lib/menus";

export function NavMain({items}: {items: MenuNode[]}) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <TopLevelItem key={item.title} item={item} pathname={pathname} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function TopLevelItem({item, pathname}: {item: MenuNode; pathname: string}) {
    const hasChildren = !!item.items?.length;
    const Icon = item.icon;

    const defaultOpen =
        item.isActive ||
        (!!item.items && item.items.some((c) => matchPath(pathname, c.url) || hasDeepActive(pathname, c)));

    if (!hasChildren) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url || "#"}>
                        {Icon ? <Icon /> : null}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    return (
        <Collapsible asChild defaultOpen={defaultOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                        {Icon ? <Icon /> : null}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="group">
                        <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                        <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items!.map((sub) => (
                            <RecursiveSubItem key={sub.title} item={sub} pathname={pathname} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

function RecursiveSubItem({item, pathname}: {item: MenuNode; pathname: string}) {
    const hasChildren = !!item.items?.length;

    if (!hasChildren) {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                    <Link href={item.url || "#"}>
                        <span className={matchPath(pathname, item.url) ? "font-semibold" : undefined}>
                            {item.title}
                        </span>
                    </Link>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        );
    }

    const defaultOpen =
        matchPath(pathname, item.url) ||
        (!!item.items && item.items.some((c) => matchPath(pathname, c.url) || hasDeepActive(pathname, c)));

    return (
        <SidebarMenuSubItem>
            <Collapsible defaultOpen={defaultOpen}>
                <div className="flex items-center">
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton className="justify-between group w-full">
                            <span className="truncate">{item.title}</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                    <SidebarMenuSub className="pl-2">
                        {item.items!.map((child) => (
                            <RecursiveSubItem key={child.title} item={child} pathname={pathname} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuSubItem>
    );
}

function matchPath(pathname: string, url?: string) {
    if (!url || url === "#") return false;
    try {
        return pathname === url || pathname.startsWith(url + "/");
    } catch {
        return false;
    }
}

function hasDeepActive(pathname: string, item: MenuNode): boolean {
    if (matchPath(pathname, item.url)) return true;
    return !!item.items?.some((c) => hasDeepActive(pathname, c));
}
