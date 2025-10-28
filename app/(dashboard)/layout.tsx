import {AppSidebar} from "@/components/app-sidebar";
import AuthGuard from "@/components/auth-guard";
import {SiteHeader} from "@/components/site-header";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <AuthGuard>
                <SidebarProvider className="flex flex-col">
                    <SiteHeader />
                    <div className="flex flex-1">
                        <AppSidebar />
                        <SidebarInset>{children}</SidebarInset>
                    </div>
                </SidebarProvider>
            </AuthGuard>
        </div>
    );
}
